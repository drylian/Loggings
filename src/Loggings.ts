/**
 * Module Loggings.
 * @module Loggings
 */
export * from "./Loggings/index";
import { Progress } from "./Loggings";
import { Controller } from "./Loggings/Controller";
import defaults, { ColorsTxT } from "./Loggings/defaults";
import { LoggingsDefaultConfig, LoggingsMessage } from "./Loggings/types";

/**
 * Updates Global configs of Loggings,
 * Update this update in real time all standard settings
 * of all instances started by Loggings, more remember,
 * if instance has a custom configuration that overlaps
 * the default configuration (custom settings) will need
 * to change the instance us using .config(configs).
 */
export function LoggingsConfig(config: Partial<LoggingsDefaultConfig>) {
    Loggings._default_configurations = {
        ...Loggings._default_configurations,
        ...config,
    };
}

/**
 * Loggings Rework, version 3.5
 * @class
 * @classdesc Class for logging and controlling logs.
 */
export class Loggings {
    public static _default_configurations = defaults();
    public static progress = Progress;
    /**
     * Configures global logging methods to use the provided Loggings instance.
     * 
     * This method overrides the default console methods (log, error, warn, info, debug) 
     * to use the corresponding methods from the provided Loggings instance. It allows 
     * for custom logging behaviors such as using colors and recording logs/errors in the terminal.
     * 
     * @param logger - An instance of Loggings to handle the logging.
     */
    public static useConsole(logger: Loggings) {
        global.loggings = logger;
        global.console = {
            ...global.console,
            log: (...msg: any[]) => global.loggings.log(...msg),
            error: (...msg: any[]) => global.loggings.error(...msg),
            warn: (...msg: any[]) => global.loggings.warn(...msg),
            info: (...msg: any[]) => global.loggings.info(...msg),
            debug: (...msg: any[]) => global.loggings.debug(...msg),
        };
    }
    /**
     * Updates Loggings config
     */
    public config(config: Partial<LoggingsDefaultConfig>) {
        this.options = {
            ...config,
        };
    }
    /**
     * Only show Custom infos of loggings,
     * To show all the settings use the const meta
     */
    public options: Partial<LoggingsDefaultConfig>;
    /**
     * Creates an instance of Loggings.
     * @constructor
     * @param {string} Controller - The title of the controller.
     * @param {LoggingsColor} Color - The color of the controller.
     * @param {Partial<LoggingsDefaultConfig>} options - Additional configuration options.
     */
    constructor(
        Controller: string = "All",
        Color: keyof typeof ColorsTxT = "blue",
        options?: Partial<LoggingsDefaultConfig>,
    ) {
        this.options = {
            controller_title: Controller,
            controller_color: Color,
            ...options,
        };
    }

    /**
     * Loggings metadata Arguments
     */
    public get meta() {
        return {
            ...Loggings._default_configurations,
            ...this.options,
        };
    }

    /**
     * Logs an error message.
     * @param {...LoggingsMessage[]} messages - Error messages.
     * @returns {void}
     */
    public error(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Error" }, messages);
    }
    /**
     * Logs a warning message.
     * @param {...LoggingsMessage[]} messages - Warning messages.
     * @returns {void}
     */
    public warn(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Warn" }, messages);
    }
    /**
     * Logs a log message.
     * @param {...LoggingsMessage[]} messages - Log messages.
     * @returns {void}
     */
    public log(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Info" }, messages);
    }
    /**
     * Logs an information message.
     * @param {...LoggingsMessage[]} messages - Information messages.
     * @returns {void}
     */
    public info(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Info" }, messages);
    }
    /**
     * Logs a debug message.
     * @param {...LoggingsMessage[]} messages - Debug messages.
     * @returns {void}
     */
    public debug(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Debug" }, messages);
    }
    /**
     * Only register logs.
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    public txt(...messages: LoggingsMessage[]): void {
        Controller({
            ...this.options,
            current_level: "Info",
            register_text: true,
            console: false,
        }, messages);
    }
    /**
     * Table of Console.table
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    public table(...messages: LoggingsMessage[]): void {
        console.table(messages);
    }
}
