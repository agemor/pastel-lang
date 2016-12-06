import Token from "./token.js";

class Lexer {

    constructor() {

        this.text = "";
        this.index = 0;

        this.defineStates();
    }

    defineStates() {

        // Self reference
        var self = this;

        // Define states
        let state = {

            active: (i, flags) => {
                let c = self.text.charAt(i);

                /* Transference Tests */

                if (c == "\\")
                    state.active(i + 1, {escape: true});

                if (c == "\'" && !flags.escape)
                    state.passive(i + 1, {type: 0});

                if (c == "\"" && !flags.escape)
                    state.passive(i + 1, {type: 1});

            },

            passive: function() {

            },

            inert: function() {

            }
        }
        this.state = state;
    }

    analyze(text) {
        this.text = text;
        this.index = 0;

        this.state.active(0);
    }


}