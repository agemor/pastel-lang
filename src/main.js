import Token from "./token.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";


var lexer = new Lexer();
lexer.analyze(`
    (define factorial n (
    (if (< n 2      ) (1) 
        (* n (factorial (- n 1))))
))`);

