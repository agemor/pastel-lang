import Parser from "./parser.js";
import Error from "./error.js";

class Evaluator {
    constructor() {

        this.parser = new Parser();
        this.definition = new Object();

        defineBasicFunctions();
    }

    evaluateText(text) {
        let node = this.parser.analyze(text);
        return evaluateNode(node);
    }

    evaluateNode(node) {

    }

    defineBasicFunctions() {

        function checkParameters(operands, minimum, maximum) {
            if (operands.length < minimum) {
                return Error(Error.SYNTAX, "At least " + minimum + " parameters are required");
            } else if (operands.length > maximum) {
                return Error(Error.SYNTAX, "Number of function parameters must be under " + maximum);
            }
            return null;
        }
        function cumulative(operands, operator, minimum = 1, maximum = 10000) {
            let isError = check(operands, minimum, maximum);
            if (isError instanceof Error) return isError; 
            let value = 0;
            for (let i = 0; i < operands.length; i++)
                value = operator(value, operands[i]);
            return value;
        }
        function decisive(operands, operator, minimum = 1, maximum = 10000) {
            let isError = check(operands, minimum, maximum);
            if (isError instanceof Error) return isError;
            let head = operands[0];
            for (let i = 1; i < operands.length; i++) {
                if (operator(head, operands[i]))
                    head = operands[i];
                else return false;
            }
            return true;
        }

        this.definition["+"]  = function() { return cumulative(arguments, (a, b) => { return a + b; }, 2); };
        this.definition["-"]  = function() { return cumulative(arguments, (a, b) => { return a - b; }, 2); };
        this.definition["*"]  = function() { return cumulative(arguments, (a, b) => { return a * b; }, 2); };
        this.definition["/"]  = function() { return cumulative(arguments, (a, b) => { return a / b; }, 2); };
        this.definition["%"]  = function() { return cumulative(arguments, (a, b) => { return a % b; }, 2, 2); };
        this.definition["&"]  = function() { return cumulative(arguments, (a, b) => { return a & b; }, 2); };
        this.definition["|"]  = function() { return cumulative(arguments, (a, b) => { return a | b; }, 2); };
        this.definition["^"]  = function() { return cumulative(arguments, (a, b) => { return a ^ b; }, 2); };
        this.definition["<<"] = function() { return cumulative(arguments, (a, b) => { return a << b; }, 2); };
        this.definition[">>"] = function() { return cumulative(arguments, (a, b) => { return a >> b; }, 2); };
        this.definition["~"]  = function(a) { return ~a; };
        this.definition["="]  = function() { return decisive(arguments, (a, b) => { return a == b; }, 2); };
        this.definition["!="] = function() { return decisive(arguments, (a, b) => { return a != b; }, 2); };
        this.definition["<"]  = function() { return decisive(arguments, (a, b) => { return a < b; }, 2); };
        this.definition[">"]  = function() { return decisive(arguments, (a, b) => { return a > b; }, 2); };
        this.definition["<="] = function() { return decisive(arguments, (a, b) => { return a <= b; }, 2); };
        this.definition[">="] = function() { return decisive(arguments, (a, b) => { return a >= b; }, 2); };
        this.definition["&&"] = function() { return decisive(arguments, (a, b) => { return a && b; }, 2); };
        this.definition["||"] = function() { return decisive(arguments, (a, b) => { return a || b; }, 2); };
        this.definition["!"]  = function(a) { return !a; };
        this.definition["add"]      = this.definition["+"];
        this.definition["subtract"] = this.definition["-"];
        this.definition["multiply"] = this.definition["*"];
        this.definition["divide"]   = this.definition["/"];
        this.definition["modular"]  = this.definition["%"];
        this.definition["equals"]   = this.definition["="];
        this.definition["differs"]  = this.definition["!="];
        this.definition["smaller"]  = this.definition["<"];
        this.definition["bigger"]   = this.definition[">"];
        this.definition["below"]    = this.definition["<="];
        this.definition["above"]    = this.definition[">="];
        this.definition["and"]      = this.definition["&&"];
        this.definition["or"]       = this.definition["||"];
        this.definition["not"]      = this.definition["!"];
    }

    
}
