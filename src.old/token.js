/**
 * Token class for syllable classification
 */

class Token {

    constructor(type , data = undefined, lineNumber = 0) {
        this.type = type;
        this.data = data;
        this.lineNumber = lineNumber;
    }

}

// Token definer
let tokenId = 0;

// Define token types
Token.OPEN      = tokenId++;
Token.CLOSE     = tokenId++;
Token.ID        = tokenId++;
Token.STRING    = tokenId++;
Token.NUMBER    = tokenId++;
Token.COMMENT   = tokenId++;
Token.SPACE   = tokenId++;

export default Token;
