import { Runtime, runtime } from "./utils";

let _inspect = (msg: string | boolean | object | number, nocolor: boolean = false) => {
    // @ts-expect-error in browser inspect is global
    return inspect(msg, { colors: !nocolor, depth: 3 });
}

switch (runtime) {
    case Runtime.Node: {
        switch (true) {
            case typeof __filename == "undefined": {
                _inspect = (msg, nocolor = false) => 
                    import("node:util").then(({ inspect }) => 
                        inspect(msg, { colors: !nocolor, depth: 3 }));
                break;
            }
            default: {
                const inspect = require("node:util");
                _inspect = (msg, nocolor = false) => 
                    inspect(msg, { colors: !nocolor, depth: 3 });
                break;
            }
        }
        break;
    }
    case Runtime.Bun: {
        // @ts-expect-error @types/Bun not installed
        _inspect = (msg, nocolor = false) => Bun.inspect(msg, { colors: !nocolor, depth: 3 });
        break;
    }
    case Runtime.Deno: {
        // @ts-expect-error @types/Deno not installed
        _inspect = (msg, nocolor = false) => Deno.inspect(msg, { colors: !nocolor, depth: 3 });
        break;
    }
}

export default _inspect;