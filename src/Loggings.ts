
import "./appl.ts";
import "./libs/functions/inspector.ts";

export * from "./libs/functions/inspector.ts";
export * from "./libs/functions/colors.ts";
export * from "./libs/functions/formatter.ts";
export * from "./libs/functions/fragmenter.ts";
export * from "./libs/functions/pallet.ts";
export * from "./libs/functions/timer.ts";
export * from "./libs/class/plugin.ts";
export * from "./libs/plugins/console.ts";
export * from "./libs/plugins/register.ts";

import type { LoggingsColors } from "./libs/functions/pallet.ts";
import { LoggingsRegister } from "./libs/plugins/register.ts";
import type { LoggingsRegisterConfig } from "./libs/plugins/register.ts";
import { LoggingsCORE } from "./libs/class/core.ts";
import type { LoggingsPluginData } from "./libs/class/plugin.ts";
import type { EmtpyObj } from "./libs/types.ts";
import SystemExecutor, { AppType } from "./appl.ts";
import { LoggingsConsole, type LoggingsConsoleConfig } from "./libs/plugins/console.ts";

/**
 * Configuration of Loggings
 */
export type LoggingsConfig = LoggingsConsoleConfig & LoggingsRegisterConfig;
switch(SystemExecutor) {
    case AppType.Deno:
    case AppType.Node:
    case AppType.Bun:
        LoggingsCORE.add(LoggingsConsole, LoggingsRegister);
        break;
    case AppType.Browser:
        // Browser no have support for register plugin
        LoggingsCORE.add(LoggingsConsole);
}

/**
 * Class of Loggings for Node js
 */
export class Loggings<
    ExtendedLoggingsConfig extends EmtpyObj extends
    LoggingsPluginData<Record<string, string>> ? ExtendedLoggingsConfig
    : LoggingsPluginData<Record<string, string>>,
> extends LoggingsCORE<ExtendedLoggingsConfig> {
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
        switch (SystemExecutor) {
            case AppType.Browser: {
                throw new Error("Brownser not have support for useConsole function!")
            }
            case AppType.Deno: {
                globalThis.loggings = logger;
                globalThis.console = {
                    ...globalThis.console,
                    log: (...msg) => globalThis.loggings!.log(...msg),
                    error: (...msg) => globalThis.loggings!.error(...msg),
                    warn: (...msg) => globalThis.loggings!.warn(...msg),
                    info: (...msg) => globalThis.loggings!.info(...msg),
                    debug: (...msg) => globalThis.loggings!.debug(...msg),
                };
                break;
            }
            case AppType.Bun:
            case AppType.Node: {
                global.loggings = logger;
                global.console = {
                    ...global.console,
                    log: (...msg) => global.loggings!.log(...msg),
                    error: (...msg) => global.loggings!.error(...msg),
                    warn: (...msg) => global.loggings!.warn(...msg),
                    info: (...msg) => global.loggings!.info(...msg),
                    debug: (...msg) => global.loggings!.debug(...msg),
                };
                break;
            };
        }
    }

    constructor(
        title?: string,
        color?: keyof typeof LoggingsColors,
        advanced?: Partial<LoggingsConfig>,
    ) {
        super();
        this.configs = Loggings.getDefaults() as never;
        if (title) (this.configs as { title: string }).title = title;
        if (color) {
            (this.configs as { color: string }).color = color;
        }
        this.configs = { ...this.configs, ...advanced };
        this.plugins = LoggingsCORE.plugins;
        LoggingsCORE.plugins.forEach((p) => p.onCreateInstance(this));
    }

    public config(conf: Partial<LoggingsConfig>) {
        this.configs = { ...this.configs, ...conf };
    }

    public static config(conf: Partial<LoggingsConfig>) {
        LoggingsCORE.configs = { ...LoggingsCORE.configs, ...conf };
    }

    public static getDefaults() {
        return {
            ...LoggingsCORE.configs,
            ...this.configs,
        };
    }
}
