import Token from "./token.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";
import Evaluator from "./evaluator.js";


let evaluator = new Evaluator();
let value = evaluator.evaluateText("(((+ 1 1)))");

console.log("Evaluated value:");
console.log(value);