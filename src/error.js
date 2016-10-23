class Error {
	constructor(type, message, location) {
		this.type = type;
		this.message = message;
		this.stack = [location];
	}

	addStack(location) {
		this.stack.push(location);
	}
}

let errorId = 0;

// Predefine type of errors;
Error.SYNTAX = errorId++;

export default Error;