import { Token } from "./Token";

export class Node {
  parent: Node;
  children: Node[];
  data: Token;

  constructor(data?: Token) {
    this.data = data;
    this.children = [];
  }

  getParent(): Node {
    return this.parent;
  }

  getData(): Token {
    return this.data;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  getChildren(): Node[] {
    return this.children;
  }

  addChild(node: Node): void {
    node.parent = this;
    this.children.push(node);
  }
}
