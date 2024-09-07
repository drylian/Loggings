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
import { LoggingsConsole } from "./libs/plugins/console/node.ts";
import { LoggingsConsoleConfig } from "./libs/plugins/console/types.ts";
import { LoggingsRegister } from "./libs/plugins/register/node.ts";
import { LoggingsRegisterConfig } from "./libs/plugins/register/types.ts";
import { LoggingsCORE } from "./libs/class/core.ts";
import { LoggingsPluginData } from "./libs/class/plugin.ts";

/**
 * Configuration of Loggings
 */
export type LoggingsConfig = LoggingsConsoleConfig & LoggingsRegisterConfig;
LoggingsCORE.add(LoggingsConsole, LoggingsRegister);

/**
 * Class of Loggings for Node js
 */
export class Loggings<
    ExtendedLoggingsConfig extends {} extends
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
        global.loggings = logger;
        global.console = {
            ...global.console,
            log: (...msg: any[]) => global.loggings!.log(...msg),
            error: (...msg: any[]) => global.loggings!.error(...msg),
            warn: (...msg: any[]) => global.loggings!.warn(...msg),
            info: (...msg: any[]) => global.loggings!.info(...msg),
            debug: (...msg: any[]) => global.loggings!.debug(...msg),
        };
    }
    constructor(
        title?: string,
        color?: keyof typeof LoggingsColors,
        advanced?: Partial<LoggingsConfig>,
    ) {
        super(process.stdin, process.stderr);
        this.configs = Loggings.getDefaults();
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
            ...LoggingsCORE.configs as any,
            ...this.configs,
        };
    }
}
