import "./types.ts";

export * from "./libs/functions/colors.ts";
export * from "./libs/functions/formatter.ts";
export * from "./libs/functions/fragmenter.ts";
export * from "./libs/functions/pallet.ts";
export * from "./libs/functions/timer.ts";
export * from "./libs/class/plugin.ts";
export * from "./libs/plugins/console/index.ts";
export * from "./libs/plugins/register/index.ts";

import { LoggingsColors } from "./libs/functions/pallet.ts";
import { LoggingsConsoleConfig } from "./libs/plugins/console/types.ts";
import { LoggingsRegisterConfig } from "./libs/plugins/register/types.ts";
import { LoggingsCORE } from "./libs/class/core.ts";
import { LoggingsPluginData } from "./libs/class/plugin.ts";
import { DenoLoggingsConsole } from "./libs/plugins/console/deno.ts";
import { DenoLoggingsRegister } from "./libs/plugins/register/deno.ts";
import process from "node:process";
/**
 * Configuration of Loggings
 */
export type LoggingsConfig = LoggingsConsoleConfig & LoggingsRegisterConfig;
LoggingsCORE.add(DenoLoggingsConsole, DenoLoggingsRegister);

/**
 * Class of Loggings for Deno
 */
export class Loggings<
    ExtendedLoggingsConfig extends Record<string | number | symbol, never> extends
        LoggingsPluginData<Record<string, string>> ? ExtendedLoggingsConfig
        : LoggingsPluginData<Record<string, string>>,
> extends LoggingsCORE<ExtendedLoggingsConfig> {
    constructor(
        title?: string,
        color?: keyof typeof LoggingsColors,
        advanced?: Partial<LoggingsConfig>,
    ) {
        super(process.stdin, process.stderr);
        this.configs = Loggings.getDefaults() as never;
        if (title) (this.configs as { title:string }).title = title;
        if (color) {
            (this.configs as { color:string }).color = color;
        }
        this.configs = { ...this.configs, ...advanced };
        LoggingsCORE.plugins.forEach((p) => p.onCreateInstance(this));
    }

    /**
     * Configures global logging methods to use the provided Loggings instance.
     *
     * This method overrides the default console methods (log, error, warn, info, debug)
     * to use the corresponding methods from the provided Loggings instance. It allows
     * for custom logging behaviors such as using colors and recording logs/errors in the terminal.
     *
     * @param logger - An instance of Loggings to handle the logging.
     */
    public static useConsole(logger: InstanceType<typeof Loggings>) {
        globalThis.loggings = logger;
        globalThis.console = {
            ...globalThis.console,
            log: (...msg) => globalThis.loggings!.log(...msg),
            error: (...msg) => globalThis.loggings!.error(...msg),
            warn: (...msg) => globalThis.loggings!.warn(...msg),
            info: (...msg) => globalThis.loggings!.info(...msg),
            debug: (...msg) => globalThis.loggings!.debug(...msg),
        };
    }

    public config(conf: Partial<LoggingsConfig>) {
        this.configs = { ...this.configs, ...conf };
    }

    public static config(conf: Partial<LoggingsConfig>) {
        LoggingsCORE.configs = { ...LoggingsCORE.configs, ...conf };
    }

    public static getDefaults() {
        return {
            ...LoggingsCORE.configs as LoggingsConfig,
            ...this.configs,
        };
    }
}

declare global {
    var loggings: LoggingsCORE<LoggingsPluginData<object>>;
    interface globalThis {
        loggings?: LoggingsCORE<LoggingsPluginData<object>>;
    }
}