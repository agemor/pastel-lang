import { Token, TokenSign } from "./Token";

/**
 * Lexical analysis by state transference machine
 */
export class Lexer {
  /** Maximum stack calls */
  private static MAX_STACK_CALLS: number = 400;

  private text: string;
  private index: number;
  private buffer: string;
  private list: Token[];
  private currentLine: number;

  private state: {
    transference: (i: number, phase?: string) => void;
    identifier: (i: number, phase?: string) => void;
    string: (i: number, phase?: string) => void;
    extension: (i: number, phase?: string) => void;
    comment: (i: number, phase?: string) => void;
    parenthesis: (i: number, phase?: string) => void;
    delimiter: (i: number, phase?: string) => void;
  };

  constructor() {
    this.defineStates();
  }

  /**
   * Split code by syllables
   */
  analyze(text: string): Token[] {
    this.text = this.purify(text);
    this.index = 0;
    this.list = [];
    this.buffer = "";
    this.currentLine = 0;

    while (this.index < this.text.length) {
      this.state.transference(this.index, "initial");
    }
    return this.list;
  }

  /**
   * Define state machine for lexical analysis
   */
  private defineStates(): void {
    // State definitions
    let state = {
      // Transference function
      transference: (i: number, phase?: string): void => {
        if (i < this.text.length) {
          // Prevent stack overflow
          if (i % Lexer.MAX_STACK_CALLS == 0 && phase != "initial") {
            this.index = i;
            return;
          }
          // Transfer to the identifier state
          state.identifier(i);
        } else {
          this.flush(TokenSign.ID);
          this.index = i;
          return;
        }
      },

      // For IDs
      identifier: (i: number, phase?: string): void => {
        let c = this.queue(i);
        switch (c) {
          case '"':
          case "'":
            this.flush(TokenSign.ID);
            state.string(i + 1, c);
            return;
          case "\\":
            this.flush(TokenSign.ID);
            state.extension(i);
            return;
          case " ":
          case ";":
            this.flush(TokenSign.ID);
            state.delimiter(i);
            return;
          case "#":
            this.flush(TokenSign.ID);
            state.comment(i + 1);
            return;
          case "(":
          case ")":
            this.flush(TokenSign.ID);
            state.parenthesis(i, c);
            return;
          default:
            this.store(c);
            state.transference(i + 1);
        }
      },

      // For strings
      string: (i: number, phase?: string): void => {
        let c = this.queue(i);

        switch (c) {
          case phase:
            this.flush(TokenSign.STRING);
            state.transference(i + 1, c);
            return;
          case "\\":
            state.extension(i + 1);
            return;
          default:
            this.store(c);
            state.string(i + 1, phase);
        }
      },

      // For escape characters
      extension: (i: number, phase?: string): void => {
        let c = this.queue(i);

        this.store("\\" + c);
        state.transference(i + 1);
      },

      // For comments
      comment: (i: number, phase?: string): void => {
        let c = this.queue(i);

        switch (c) {
          case ";":
            this.nextLine();
            this.flush(TokenSign.COMMENT);
            state.transference(i + 1);
            return;
          default:
            this.store(c);
            state.comment(i + 1);
        }
      },

      // For parenthesis
      parenthesis: (i: number, phase?: string): void => {
        let c = this.queue(i);

        this.store(c);
        if (phase == "(") this.flush(TokenSign.OPEN);
        else if (phase == ")") this.flush(TokenSign.CLOSE);
        state.transference(i + 1);
      },

      // For whitespaces and linefeeds
      delimiter: (i: number, phase?: string): void => {
        let c = this.queue(i);

        switch (c) {
          case ";":
            this.nextLine();
          case " ":
            this.store(c);
            state.delimiter(i + 1);
            return;
          default:
            this.flush(TokenSign.SPACE);
            state.transference(i);
        }
      }
    };
    this.state = state;
  }

  /**
   * Get one character from the original text.
   *
   * @param i number
   */
  private queue(i: number): string {
    return this.text.charAt(i);
  }

  /**
   * Add one character to the buffer.
   *
   * @param c string
   */
  private store(c: string): void {
    this.buffer += c;
  }

  /**
   * Flush buffer into token list with given token sign.
   *
   * @param t TokenSign
   */
  private flush(t: TokenSign): void {
    if (this.buffer.length > 0) {
      // Special treatment for id tokens that contain only numbers
      let isNumber = t == TokenSign.ID && !isNaN(Number(this.buffer));
      this.list.push(
        new Token(
          isNumber ? TokenSign.NUMBER : t,
          this.buffer,
          this.currentLine
        )
      );
      this.buffer = "";
    }
  }

  private nextLine() {
    this.currentLine++;
  }

  /**
   * Remove/unify unsupported characters.
   */
  purify(text: string): string {
    // Unify newline formats
    text = text.replace(/(?:\r\n|\r|\n)/g, ";");

    // Unify whitespace formats
    text = text.replace(/\s/gi, " ");

    return text;
  }
}
