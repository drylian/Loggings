import { Runtime, runtime } from "./utils";
import { inspect as Inpector } from "node:util";
const opts = {
    depth: null,
    showHidden: false,
    showProxy: false,
    maxArrayLength: null,
    breakLength: Infinity,
    compact: false
};

let _inspect = (msg: string | boolean | object | number, _nocolor: boolean = false) => {
    return msg as string;
}

switch (runtime) {
    case Runtime.Node: {
        _inspect = (msg, nocolor = false) => Inpector(msg, {
            colors: !nocolor,
            ...opts
        });
        break;
    }
    case Runtime.Bun: {
        try {
            // @ts-expect-error @types/Bun not installed
            _inspect = (msg, nocolor = false) => Bun.inspect(msg, {
                colors: !nocolor,
                ...opts
            });
        } catch (e) {
            console.warn("Failed to use Bun.inspect, using fallback");
        }
        break;
    }
    case Runtime.Deno: {
        try {
            // @ts-expect-error @types/Deno not installed
            _inspect = (msg, nocolor = false) => Deno.inspect(msg, {
                colors: !nocolor,
                ...opts
            });
        } catch (e) {
            console.warn("Failed to use Deno.inspect, using fallback");
        }
        break;
    }
}


export default _inspect;