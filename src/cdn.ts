/**
 * Export various modules and types required for the logging system.
 */
export * from "./types";
export * from "./libs/defaults";
export * from "./libs/inspect";
export * from "./libs/pallet";
export * from "./libs/plugins/console";
export * from "./libs/utils";
export * from "./libs/formatkits";

import defaults, { type LoggingsBaseConfig, type LoggingsConstructorConfig } from "./libs/defaults";
import { ConsolePlugin } from "./libs/plugins/console";
import type { LoggingsLevel, LoggingsMessage, LoggingsPlugin, LoggingsPluginData, LoggingsPluginsConfig, LoggingsPluginsConfiguration } from "./types";
import type { LoggingsPallet } from "./cdn";

/**
 * Default plugins used in the logging system.
 */
export const LoggingsDefaultPlugins = [ConsolePlugin];
declare const global: typeof globalThis & { __INTERNAL_LOGGINGS_INSTANCE__: InstanceType<typeof Loggings> };

/**
 * Loggings class extends the built-in Console class and provides
 * a structured logging system with plugin support.
 */
export class Loggings<
    const in out Plugins extends LoggingsPlugin<any>[] = typeof LoggingsDefaultPlugins,
> {
    /**
     * Global logging configuration.
     */
    public static configs: Record<string, any> = defaults;

    /**
     * Instance-specific logging configuration.
     */
    public configs: Omit<LoggingsConstructorConfig<Plugins>, "plugins">;

    /**
     * Get all instance configurations including plugins configurations
     */
    public get allconfigs() {
        return Object.assign({ ...Loggings.allconfigs, ...this.configs })
    }

    /**
     * Get all Globals configurations including plugins configurations
     */
    public static get allconfigs() {
        return Object.assign(Loggings.configs, ...Loggings.pluginLoader(this.plugins).map(a => a.default))
    }

    /**
     * Default plugins applied globally.
     */
    public static plugins: LoggingsPlugin<any>[] = LoggingsDefaultPlugins;

    /**
     * Instance-specific plugins.
     */
    public plugins: Plugins;

    // Old loggings format
    constructor(title?: string, color?: keyof typeof LoggingsPallet, advanced?: Partial<LoggingsBaseConfig> & { plugins?: Plugins } & Partial<LoggingsPluginsConfig<Plugins>> & {
        plugins?: typeof LoggingsDefaultPlugins
    })
    // New loggings format
    constructor(advanced: Partial<LoggingsBaseConfig> & { plugins?: Plugins } & Partial<LoggingsPluginsConfig<Plugins>> & {
        plugins?: typeof LoggingsDefaultPlugins
    })
    /**
     * Constructor supporting both old and new format configurations.
     *
     * @param opts Configuration options or a string title.
     * @param color Color for logging messages.
     * @param advanced Advanced logging configurations.
     */
    constructor(opts?: Partial<LoggingsBaseConfig> | string, color: keyof typeof LoggingsPallet = "blue", advanced = {}) {
        const IsOpt = typeof opts == "object";
        //@ts-expect-error
        this.plugins = [...(IsOpt ? opts?.plugins ?? [] : []), ...(advanced?.plugins ?? [])] as unknown as Plugins;
        this.configs = { color, ...advanced, ...(typeof opts == "string" ? { title: opts } : opts) } as unknown as LoggingsConstructorConfig<Plugins>;
        Loggings.pluginLoader(this.plugins).forEach((plugin) => {
            if (plugin.onInit) plugin.onInit(this.allconfigs);
        });
    }

    /**
     * Loads plugins into the logging system.
     *
     * @param instance_plugins List of plugins to be loaded.
     * @param nostatic Whether to skip static plugin loading.
     * @returns Loaded plugin data.
     */
    public static pluginLoader<Plugins extends LoggingsPlugin<any>[]>(instance_plugins: Plugins, nostatic = false): LoggingsPluginData<any>[] {
        const plugins: Record<string, LoggingsPluginData<any>> = {};

        if (!nostatic) Loggings.plugins.forEach((p) => {
            const plugin = typeof p === "function" ? p() : p;
            plugins[plugin.ident] = plugin;
        });

        instance_plugins.forEach((p) => {
            const plugin = typeof p === "function" ? p() : p;
            plugins[plugin.ident] = plugin;
        });
        return Object.values(plugins);
    }

    /**
     * Updates the logging configuration dynamically.
     *
     * @param advanced New configuration settings.
     * @returns Updated Loggings instance.
     */
    public config<const NewPlugins extends LoggingsPlugin<any>[] = typeof LoggingsDefaultPlugins>(advanced: Partial<LoggingsBaseConfig> & { plugins?: NewPlugins } & Partial<LoggingsPluginsConfig<NewPlugins>> = {}): Loggings<NewPlugins> {
        if (advanced?.plugins) {
            this.plugins.length = 0;
            //@ts-expect-error
            this.plugins = advanced?.plugins ?? [];
        }
        this.configs = { ...this.configs, ...advanced };
        Loggings.pluginLoader(this.plugins, true).forEach((plugin) => {
            if (plugin.onInit) plugin.onInit(this.allconfigs);
        });
        //@ts-expect-error
        return this;
    }

    /**
     * Updates Global logging configuration dynamically.
     *
     * @param advanced New configuration settings.
     * @returns Updated Loggings instance.
     */
    public static config<const NewPlugins extends LoggingsPlugin<any>[] = typeof LoggingsDefaultPlugins>(
        advanced: Partial<LoggingsBaseConfig> &
        { plugins?: NewPlugins } &
            Partial<LoggingsPluginsConfig<NewPlugins>> = {}): Loggings<NewPlugins> {
        if (advanced?.plugins) {
            Loggings.plugins.length = 0;
            Loggings.plugins = advanced?.plugins ?? [];
        }
        this.configs = { ...Loggings.configs, ...advanced };
        Loggings.pluginLoader(Loggings.plugins, true).forEach((plugin) => {
            if (plugin.onInit) plugin.onInit(this.allconfigs);
        });
        //@ts-expect-error
        return this;
    }

    /**
     * Controls message logging using the configured plugins.
     *
     * @param msgs Messages to be logged.
     * @param level Log level.
     */
    public controller(msgs: LoggingsMessage[], level: LoggingsLevel) {
        Loggings.pluginLoader(this.plugins).forEach((plugin) => {
            try {
                let messages = plugin.onPreMessage ? plugin.onPreMessage(this.allconfigs, level, msgs) : msgs;
                if (messages && plugin.onMessage) {
                    const message = plugin.onMessage(this.allconfigs, level, messages);
                    if (plugin.onSend) plugin.onSend(this.allconfigs, level, message);
                }
            } catch (e) {
                if (plugin.onError) plugin.onError(this.allconfigs, e as Error);
                else throw e;
            }
        });
    }

    /** Logging methods */
    public log(...messages: LoggingsMessage[]) { this.controller(messages, "info"); return this; }
    public debug(...messages: LoggingsMessage[]) { this.controller(messages, "debug"); return this; }
    public error(...messages: LoggingsMessage[]) { this.controller(messages, "error"); return this; }
    public trace(...messages: LoggingsMessage[]) { this.controller(messages, "trace"); return this; }
    public info(...messages: LoggingsMessage[]) { this.controller(messages, "info"); return this; }
    public warn(...messages: LoggingsMessage[]) { this.controller(messages, "warn"); return this; }
}

export default Loggings;
