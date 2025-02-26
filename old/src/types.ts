import type { LoggingsCORE } from "./libs/class/core.ts";
import type { LoggingsPluginData } from "./libs/class/plugin.ts";

declare global {
    var loggings: LoggingsCORE<LoggingsPluginData<object>>;
    interface globalThis {
        loggings?: LoggingsCORE<LoggingsPluginData<object>>;
    }
}