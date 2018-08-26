class Error {

	constructor(type, message, lineNumber) {
		this.self = this;
		this.type = type;
		this.message = message;
		this.stack = [lineNumber];
	}

	after(lineNumber) {
		this.stack.push(lineNumber);
		return this.self;
	}
}

let errorId = 0;

// Predefine type of errors;
Error.SYNTAX = errorId++;

export default Error;
