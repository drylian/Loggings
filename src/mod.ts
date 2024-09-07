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

/**
 * Configuration of Loggings
 */
export type LoggingsConfig = LoggingsConsoleConfig & LoggingsRegisterConfig;
LoggingsCORE.add(DenoLoggingsConsole, DenoLoggingsRegister);

/**
 * Class of Loggings for Deno
 */
export class Loggings<
    ExtendedLoggingsConfig extends {} extends
        LoggingsPluginData<Record<string, string>> ? ExtendedLoggingsConfig
        : typeof DenoLoggingsConsole & typeof DenoLoggingsRegister,
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
