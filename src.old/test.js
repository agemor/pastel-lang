import Evaluator from "./evaluator.js";
import Transpiler from "./transpiler.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";
import Node from "./node.js";
import Error from "./error.js";
import Token from "./token.js";

var evaluator = new Evaluator();
var lexer = new Lexer();

let code = `(define me 3)
#qeg
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

var result = evaluator.evaluateText(code);
//console.log(result);