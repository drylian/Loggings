import "./types.ts";

export * from "./libs/functions/colors.ts";
export * from "./libs/functions/formatter.ts";
export * from "./libs/functions/pallet.ts";
export * from "./libs/functions/timer.ts";
export * from "./libs/class/plugin.ts";

import { LoggingsColors } from "./libs/functions/pallet.ts";
import { LoggingsConsoleConfig } from "./libs/plugins/console/types.ts";
import { LoggingsCORE } from "./libs/class/core.ts";
import { LoggingsPluginData } from "./libs/class/plugin.ts";
import { CdnLoggingsConsole } from "./libs/plugins/console/cdn.ts";

/**
 * Configuration of Loggings
 */
export type LoggingsConfig = LoggingsConsoleConfig ;
LoggingsCORE.add(CdnLoggingsConsole);

/**
 * Class of Loggings for Node js
 */
export class Loggings<
    ExtendedLoggingsConfig extends {} extends
        LoggingsPluginData<Record<string, string>> ? ExtendedLoggingsConfig
        : typeof CdnLoggingsConsole,
> extends LoggingsCORE<ExtendedLoggingsConfig> {
    constructor(
        title?: string,
        color?: keyof typeof LoggingsColors,
        advanced?: Partial<LoggingsConfig>,
    ) {
        super(process.stdin, process.stderr);
        this.configs = Loggings.getDefaults();
        if (title) this.configs.title = title;
        if (color) {
            this.configs.color = color;
        }
        this.configs = { ...this.configs, ...advanced };
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
            ...LoggingsCORE.configs as LoggingsConfig,
            ...this.configs,
        };
    }
}
