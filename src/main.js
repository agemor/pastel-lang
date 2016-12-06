import Interpreter from "./interpreter.js";
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

module.exports = pastel;