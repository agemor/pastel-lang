import Evaluator from "./evaluator.js";
import Transpiler from "./transpiler.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";
import Node from "./node.js";
import Error from "./error.js";
import Token from "./token.js";

var pastel = {
        Evaluator: Evaluator,
        Transpiler: Transpiler,
        Lexer: Lexer,
        Parser: Parser,
        Node: Node,
        Error: Error,
        Token: Token
    }
/*
var parser = new pastel.Parser();
var lexer = new pastel.Lexer();
let c = "(print (+ 1 1)) (if (= 3 4) (print 'correct!') (print 'incorrect!'))  ";

console.log(lexer.analyze(c));


let code = `
(define me 3)
(define factorial n (
    (if (< n 2) (1)
        (* n (factorial (- n 1))))
))
(define fibonacci n (
    (if (= n 0) (0)
    (if (= n 1) (1)
        (+ (fibonacci (- n 1)) (fibonacci (- n 2)))))
))
(define check (n c) (
    (if (< (square n) (prime c)) (true)
        ((if (zero (modular n (prime c))) (false)
             (check n (+ c 1)))))
))
(define prime n (
    (if (= n 1) (2) (
    	(define search r (
    		(if (check r 1) (r) (search (+ r 1)))))
        (search (+ (prime (- n 1)) 1))))
))
(define plus (a b) (+ a b))
(print (plus (if (> 2 3) (1) (20)) me))
(print true)
(print (factorial 10))
(print (fibonacci 25))
(print (prime 16))
`;

let result = evaluator.evaluateText(code);//transpiler.evaluateText(code).concat("\n");
console.log(result);
*/
module.exports = pastel;