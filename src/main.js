import Token from "./token.js";
import Tokenizer from "./tokenizer.js";
import Lexer from "./lexer.js";


var lexer = new Lexer();
lexer.analyze(`
    (define factorial n (
    (if (< n 2      ) (1) 
        (* n (factorial (- n 1))))
))`);