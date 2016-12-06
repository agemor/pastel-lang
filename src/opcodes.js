class Opcodes {

    constructor() {
        this.codes = [];
    }

    add(opcode, data) {
        this.codes.push(opcode + " " + data);
    }

}

Opcodes.PUSH    = "PUSH";
Opcodes.POP     = "POP";
export default Opcodes;