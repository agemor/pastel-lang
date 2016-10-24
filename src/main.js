import Token from "./token.js";
import Lexer from "./lexer.js";
import Parser from "./parser.js";
import Evaluator from "./evaluator.js";


let evaluator = new Evaluator();
let value = evaluator.evaluateText(`


	print (+ (if (> 2 3)	
				 (1) (20)
			  ) 3
		  )`);
