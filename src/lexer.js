import Token from "./token.js";
import Tokenizer from "./tokenizer.js";

class Lexer {

    constructor() {
        this.tokenizer = new Tokenizer();
    }

    analyze(text) {
        var tokens = this.tokenizer.tokenize(text);
        console.log(tokens);

    }

    
}

export default Lexer;

let lexer = new Lexer();
console.log(lexer.analyze(`
    (define factorial n (
    (if (< n 2      ) (1) 
        (* n (factorial (- n 1))))
)) 
    `));