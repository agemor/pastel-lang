import { Token, TokenSign } from "./Token";
import { Lexer } from "./Lexer";
import { Node } from "./Node";
import { Error, ErrorType } from "./Error";

export class Parser {
  protected lexer: Lexer;

  constructor() {
    this.lexer = new Lexer();
  }

  /**
   * Create syntax tree
   */
  analyze(text: string): Node | Error {
    let tokenArray = this.lexer.analyze(text);
    let tokenTree = this.treefy(tokenArray);
    return tokenTree;
  }

  /**
   * Convert 1-d token array to 2-d tree
   */
  treefy(tokenArray: Token[]): Node | Error {
    // Parent tree
    let tree = new Node();

    let index = 0;
    let depth = 0;
    let subarray: Token[] = [];

    while (index < tokenArray.length) {
      let token = tokenArray[index++];

      if (token.sign == TokenSign.SPACE || token.sign == TokenSign.COMMENT)
        continue;

      // Open
      if (token.sign == TokenSign.OPEN) {
        depth++;
        if (depth == 1) {
          subarray = [];
          continue;
        }
      }
      // Close
      else if (token.sign == TokenSign.CLOSE) {
        depth--;

        // Depth cannot be smaller than 0
        if (depth < 0)
          return new Error(
            ErrorType.SYNTAX,
            "Surplus ')' exists",
            token.lineNumber
          );

        if (depth == 0) {
          // Create sub-tree
          let subtree = this.treefy(subarray);

          // If error, just pass beyond (no stack push)
          if (subtree instanceof Error) return subtree;

          tree.addChild(subtree);
          continue;
        }
      }

      // Direct (siblings) token
      if (depth == 0) {
        tree.addChild(new Node(token));
      }

      // Subarray (children) token
      else if (depth > 0) {
        subarray.push(token);
      }
    }

    // Depth must be 0 at the termination point
    if (depth > 0)
      return new Error(
        ErrorType.SYNTAX,
        "'(' not closed",
        tokenArray[tokenArray.length - 1].lineNumber
      );

    return tree;
  }

  /**
   * Convert 2-d tree to code
   */
  stringify(node: Node): string {
    let string = "";
    if (!node.getData()) {
      let children = node.getChildren();
      string += "(";

      for (let i = 0; i < children.length; i++) {
        string += i != 0 ? " " : "";
        string += this.stringify(children[i]);
      }
      string += ")";
    } else {
      string += node.getData().data;
    }

    return string;
  }

  viewTree(node: Node, space: string = ""): void {
    if (!node.getData()) {
      console.log(space + "(container)");
      let children = node.getChildren();
      for (let i = 0; i < children.length; i++) {
        this.viewTree(children[i], space + "---");
      }
    } else {
      console.log(
        space + "(token " + node.getData().sign + ") " + node.getData().data
      );
    }
  }
}
