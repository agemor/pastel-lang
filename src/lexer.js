class Lexer {

    constructor() {

    }

    analyze(text) {
        return this.split(text);
    }

    /**
     * Split code by syllables
     */
    split(text) {

        // Unify whitespace format
        text = text.replace(/\s/g, " ");

        let syllables = [];
        let buffer = "";

        // buffer flush
        function flush() {
            if (buffer.length > 0) {
                syllables.push(buffer);
                buffer = "";
            }
        }

        // Space flags
        let spaceFlag = false;

        // String flags
        let stringOpened = false;
        let stringOpener = "";

        for (let i in text) {

            let char = text.charAt(i);

            // Space is delimiter
            if (char == " " && !stringOpened) {
                if (!spaceFlag) {
                    spaceFlag = true;
                    flush();
                }
                // Space is non-insertive
                continue;
            } else {
                spaceFlag = false;
            }

            // Parens as delemiter
            if ((char == "(" || char == ")") && !stringOpened) {
                if (char == "(") {
                    buffer += char;
                    flush();
                } else {
                    flush();
                    buffer += char;
                }
                continue;
            }

            // Bundle up strings as delimiter
            if (char == "\"" || char == "\'") {

                // String open
                if (!stringOpened) {
                    stringOpener = char;
                    stringOpened = true;
                    flush();
                    buffer += char;
                    continue;
                }
                // String close
                else if (stringOpener == char) {
                    stringOpened = false;
                    buffer += char;
                    flush();
                    continue;
                }
            }

            // Write buffer
            buffer += char;
        }
        // Last flush
        flush();

        return syllables;
    }
}

let lexer = new Lexer();
console.log(lexer.analyze(`
    (define factorial n (
    (if (< n 2      ) (1) 
        (* n (factorial (- n 1))))
)) 
    `));