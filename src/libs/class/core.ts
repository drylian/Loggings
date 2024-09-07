import { LoggingsLevel, LoggingsMessage } from "../types.ts";
import {
    LoggingsPlugin,
    LoggingsPluginData,
    LoggingsPluginLoader,
} from "./plugin.ts";
import { Console } from "node:console";

/**
 * Loggings Core Class
 *
 * @class LoggingsCORE
 * @extends Console
 *
 * @description
 * This class extends the native Node.js `Console` and acts as the core logging
 * system. It allows for the addition of plugins that can modify and handle
 * log messages in various ways. The class provides methods for logging
 * different levels of messages (`info`, `error`, `trace`, `debug`, `warn`).
 */
export class LoggingsCORE<LoggingsConfig extends LoggingsPluginData<object>>
    extends Console {
    /**
     * Static configurations for all instances of LoggingsCORE.
     *
     * @type {Record<string, unknown>}
     * @static
     */
    public static configs: Record<string, unknown> = {};

    /**
     * Instance-specific configurations.
     *
     * @type {LoggingsConfig}
     */
    public configs = {} as LoggingsConfig["defaults"];

    /**
     * List of active plugins for the logging system.
     *
     * @type {LoggingsPluginLoader[]}
     * @static
     */
    public static plugins: LoggingsPluginLoader[] = [];

    /**
     * List of active plugins for the instance logging system.
     *
     * @type {LoggingsPluginLoader[]}
     * @static
     */
    public plugins: LoggingsPluginLoader[] = [];

    /**
     * Resets the plugin list, removing all active plugins.
     *
     * @static
     */
    public static reset() {
        LoggingsCORE.plugins.length = 0;
    }

    /**
     * Resets the plugin list, removing all active plugins.
     *
     * @static
     */
    public reset() {
        this.plugins.length = 0;
    }

    /**
     * Adds one or more plugins to the logging system.
     *
     * @param {...LoggingsPluginLoaderData[]} plugins - Plugins to be added.
     *
     * @static
     */
    public static add(...plugins: LoggingsPluginData<unknown>[]) {
        plugins.forEach((data) => {
            const plugin = LoggingsPlugin(data);
            if (plugin.defaults) {
                Object.assign(LoggingsCORE.configs, plugin.defaults);
            }
            LoggingsCORE.plugins.forEach((p) => p.onAddPlugin(plugin));
            LoggingsCORE.plugins.push(plugin);
        });
    }

    /**
     * Adds one or more plugins to the logging system.
     *
     * @param {...LoggingsPluginLoader[]} plugins - Plugins to be added.
     *
     * @static
     */
    public add(...plugins: LoggingsPluginLoader[]) {
        plugins.forEach((plugin) => {
            if (plugin.defaults) {
                Object.assign(
                    this.configs as Record<string, string>,
                    plugin.defaults,
                );
            }
            this.plugins.forEach((p) => p.onAddPlugin(plugin));
            this.plugins.push(plugin);
        });
    }

    /**
     * Retrieves a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin.
     * @returns {LoggingsPluginLoader | undefined} - The found plugin or undefined if not found.
     *
     * @static
     */
    public static get<Plugin extends LoggingsPluginLoader>(ident: string) {
        return LoggingsCORE.plugins.find((plugin) =>
            plugin.identify === ident
        ) as Plugin;
    }

    /**
     * Retrieves a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin.
     * @returns {LoggingsPluginLoader | undefined} - The found plugin or undefined if not found.
     *
     * @static
     */
    public get<Plugin extends LoggingsPluginLoader>(ident: string) {
        return this.plugins.find((plugin) =>
            plugin.identify === ident
        ) as Plugin;
    }

    /**
     * Removes a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin to be removed.
     *
     * @static
     */
    public static rem(ident: string) {
        LoggingsCORE.plugins = LoggingsCORE.plugins.filter((pl) => {
            const isPlugin = pl.identify === ident;
            if (isPlugin) {
                LoggingsCORE.plugins.forEach((p) => p.onRemPlugin(pl));
                if (pl.defaults) {
                    Object.keys(pl.defaults).forEach((key) =>
                        delete (LoggingsCORE.configs as Record<string, string>)[
                            key
                        ]
                    );
                }
            }
            return !isPlugin;
        });
    }

    /**
     * Removes a plugin by its identifier.
     *
     * @param {string} ident - The identifier of the plugin to be removed.
     *
     * @static
     */
    public rem(ident: string) {
        this.plugins = this.plugins.filter((pl) => {
            const isPlugin = pl.identify === ident;
            if (isPlugin) {
                this.plugins.forEach((p) => p.onRemPlugin(pl));
                if (pl.defaults) {
                    Object.keys(pl.defaults).forEach((key) =>
                        delete (this.configs as Record<string, string>)[key]
                    );
                }
            }
            return !isPlugin;
        });
    }

    /**
     * Internal controller method that passes log messages to all active plugins.
     *
     * @param {LoggingsMessage[]} msgs - The messages to be logged.
     * @param {LoggingsLevel} type - The log level (info, error, trace, debug, warn).
     */
    public controller(msgs: LoggingsMessage[], type: LoggingsLevel) {
        this.plugins.forEach((plugin) => {
            plugin.onMessage(
                {
                    ...LoggingsCORE.configs,
                    ...this.configs,
                },
                type,
                msgs,
            );
        });
    }

    /**
     * Logs a message with "info" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public log(...messages: LoggingsMessage[]) {
        this.controller(messages, "info");
    }

    /**
     * Logs a message with "error" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public error(...messages: LoggingsMessage[]) {
        this.controller(messages, "error");
    }

    /**
     * Logs a message with "trace" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public trace(...messages: LoggingsMessage[]) {
        this.controller(messages, "trace");
    }

    /**
     * Logs a message with "debug" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public debug(...messages: LoggingsMessage[]) {
        this.controller(messages, "debug");
    }

    /**
     * Logs a message with "warn" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public warn(...messages: LoggingsMessage[]) {
        this.controller(messages, "warn");
    }

    /**
     * Logs a message with "info" level (alias for `log`).
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public info(...messages: LoggingsMessage[]) {
        this.controller(messages, "info");
    }

    /**
     * Internal controller method that passes log messages to all active plugins.
     *
     * @param {LoggingsMessage[]} msgs - The messages to be logged.
     * @param {LoggingsLevel} type - The log level (info, error, trace, debug, warn).
     */
    public static controller(msgs: LoggingsMessage[], type: LoggingsLevel) {
        LoggingsCORE.plugins.forEach((plugin) => {
            plugin.onMessage(
                {
                    ...LoggingsCORE.configs,
                    ...this.configs,
                },
                type,
                msgs,
            );
        });
    }

    /**
     * Logs a message with "info" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public static log(...messages: LoggingsMessage[]) {
        LoggingsCORE.controller(messages, "info");
    }

    /**
     * Logs a message with "error" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public static error(...messages: LoggingsMessage[]) {
        LoggingsCORE.controller(messages, "error");
    }

    /**
     * Logs a message with "trace" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public static trace(...messages: LoggingsMessage[]) {
        LoggingsCORE.controller(messages, "trace");
    }

    /**
     * Logs a message with "debug" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public static debug(...messages: LoggingsMessage[]) {
        LoggingsCORE.controller(messages, "debug");
    }

    /**
     * Logs a message with "warn" level.
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public static warn(...messages: LoggingsMessage[]) {
        LoggingsCORE.controller(messages, "warn");
    }

    /**
     * Logs a message with "info" level (alias for `log`).
     *
     * @param {...LoggingsMessage[]} messages - The messages to be logged.
     */
    public static info(...messages: LoggingsMessage[]) {
        LoggingsCORE.controller(messages, "info");
    }
}
