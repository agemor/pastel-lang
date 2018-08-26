export enum ErrorType {
  SYNTAX
}

export class Error {
  type: ErrorType;
  message: string;
  lineNumberStack: number[];

  constructor(type: ErrorType, message: string, lineNumber: number) {
    this.type = type;
    this.message = message;
    this.lineNumberStack = [lineNumber];
  }

  after(lineNumber: number) {
    this.lineNumberStack.push(lineNumber);
  }
}
