import SystemExecutor, { AppType } from "../../appl.ts";
import type { LoggingsMessage } from "../types.ts";
import Module from "node:module";
const require = Module.createRequire(import.meta.url);
function MakeInspector() {
    switch (SystemExecutor) {
        case AppType.Deno: {
            //@ts-ignore deno
            return (msg: LoggingsMessage) => Deno.inspect(msg, { colors: true });
        }
        case AppType.Node: {
            //@ts-ignore node
            const { inspect } = require("node:util");
            return (msg: LoggingsMessage) => inspect(msg, { colors: true });
        }
        case AppType.Bun: {
            //@ts-ignore bun
            return (msg: LoggingsMessage) => globalThis.Bun.inspect(msg, { colors: true });
        }
        case AppType.Browser: {
            //@ts-ignore brownser
            return (msg: LoggingsMessage) => inspect(msg, { colors: true });
        }
        default: {
            //@ts-ignore brownser
            return (msg: LoggingsMessage) => inspect(msg, { colors: true });
        }
    }
}

export const inspector = MakeInspector();
