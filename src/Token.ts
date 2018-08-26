export enum TokenSign {
  OPEN, // (
  CLOSE, // )
  ID,
  STRING,
  NUMBER,
  COMMENT,
  SPACE
}

/**
 * Token class for syllable classification
 */
export class Token {
  sign: TokenSign;
  data: string;
  lineNumber: number;

  constructor(sign: TokenSign, data: string = null, lineNumber: number = 0) {
    this.sign = sign;
    this.data = data;
    this.lineNumber = lineNumber;
  }
}
