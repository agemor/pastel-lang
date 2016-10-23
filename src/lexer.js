import Token from "./token.js";
import Tokenizer from "./tokenizer.js";
import Node from "./node.js";
import Error from "./error.js";

class Lexer {

    constructor() {
        this.tokenizer = new Tokenizer();
    }

    /**
     * Create syntax tree
     */
    analyze(text) {

        let tokenArray = this.tokenizer.tokenize(text);
        let tokenTree = this.treefy(tokenArray);

        return tokenTree;
    }

    /**
     * Convert 1-d token array to 2-d tree
     */
    treefy(tokenArray) {

        // Parent tree
        let tree = new Node();

        let index = 0;
        let depth = 0;
        let subarray = [];

        while (index < tokenArray.length) {

            let token = tokenArray[index++];

            // Open
            if (token.type == Token.OPEN) {
                subarray = [];
                depth++;
            }

            // Close
            else if (token.type == Token.CLOSE) {

                depth--;

                // Depth cannot be smaller than 0
                if (depth < 0)
                    return new Error(Error.SYNTAX, "Surplus ')' exists", token.location);

                // Create sub-tree
                let subtree = this.treefy(subarray);

                // If error, just pass beyond (no stack push)
                if (subtree instanceof Error)
                    return subtree;

                tree.addChild(subtree);

            }

            // Direct (siblings) token
            else if (depth == 0) {
                tree.addChild(new Node(token));
            } 

            // Subarray (children) token
            else if (depth > 0) {
                subarray.push(token);
            }
        }

        // Depth must be 0 at the termination point
        if (depth > 0)
            return new Error(Error.SYNTAX, "'(' not closed", tokenArray[tokenArray.length - 1].location);

        return tree;
    }

    
}

export default Lexer;