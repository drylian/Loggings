/**
 * Module Loggings.
 * @module Loggings
 */
export * from "./Loggings/index";
import { Progress } from "./Loggings";
import { ColorsTxT } from "./Loggings/defaults";
import { LoggingsDefaultConfig, LoggingsMessage } from "./Loggings/types";
/**
 * Updates Global configs of Loggings,
 * Update this update in real time all standard settings
 * of all instances started by Loggings, more remember,
 * if instance has a custom configuration that overlaps
 * the default configuration (custom settings) will need
 * to change the instance us using .config(configs).
 */
export declare function LoggingsConfig(config: Partial<LoggingsDefaultConfig>): void;
/**
 * Loggings Rework, version 3.5
 * @class
 * @classdesc Class for logging and controlling logs.
 */
export declare class Loggings {
    static _default_configurations: LoggingsDefaultConfig;
    static progress: typeof Progress;
    /**
     * Updates Loggings config
     */
    config(config: Partial<LoggingsDefaultConfig>): void;
    /**
     * Only show Custom infos of loggings,
     * To show all the settings use the const meta
     */
    options: Partial<LoggingsDefaultConfig>;
    /**
     * Creates an instance of Loggings.
     * @constructor
     * @param {string} Controller - The title of the controller.
     * @param {LoggingsColor} Color - The color of the controller.
     * @param {Partial<LoggingsDefaultConfig>} options - Additional configuration options.
     */
    constructor(Controller?: string, Color?: keyof typeof ColorsTxT, options?: Partial<LoggingsDefaultConfig>);
    /**
     * Loggings metadata Arguments
     */
    get meta(): {
        format: string;
        status_colors: {
            Debug: import("./Loggings").LoggingsColor;
            Info: import("./Loggings").LoggingsColor;
            Warn: import("./Loggings").LoggingsColor;
            Error: import("./Loggings").LoggingsColor;
        };
        color_fallback: "none" | "red" | "green" | "lime" | "blue" | "yellow" | "cyan" | "magenta" | "black" | "white" | "gray" | "maroon" | "olive" | "navy" | "purple" | "teal" | "silver" | "indigo" | "gold" | "pink" | "orange" | "brown" | "peach" | "lavender" | "bred" | "bgreen" | "blime" | "bblue" | "byellow" | "bcyan" | "bmagenta" | "bblack" | "bwhite" | "bgray" | "bmaroon" | "bolive" | "bnavy" | "bpurple" | "bteal" | "bsilver" | "bindigo" | "bgold" | "bpink" | "borange" | "bbrown" | "bpeach" | "blavender" | "inverse" | "reset" | "bold";
        level: "Debug" | "Info" | "Warn" | "Error";
        console: boolean;
        logger: (contents: import("./Loggings").LoggingsLoggerContents, type: "error" | "warn" | "info" | "debug") => any;
        controller_title: string;
        controller_color: "none" | "red" | "green" | "lime" | "blue" | "yellow" | "cyan" | "magenta" | "black" | "white" | "gray" | "maroon" | "olive" | "navy" | "purple" | "teal" | "silver" | "indigo" | "gold" | "pink" | "orange" | "brown" | "peach" | "lavender" | "bred" | "bgreen" | "blime" | "bblue" | "byellow" | "bcyan" | "bmagenta" | "bblack" | "bwhite" | "bgray" | "bmaroon" | "bolive" | "bnavy" | "bpurple" | "bteal" | "bsilver" | "bindigo" | "bgold" | "bpink" | "borange" | "bbrown" | "bpeach" | "blavender" | "inverse" | "reset" | "bold";
        register: boolean;
        register_del: boolean;
        register_limit: number;
        remove_colors: boolean;
        register_dir: string;
        register_locale_file: string;
        register_format: string;
        register_type: "log" | "json";
        progress_format: string;
        progress_size: number;
        progress_bar: string;
        progress_mili: boolean;
        progress_show: boolean;
        progress_fixed?: number;
        progress_onAdd?: (progress: Progress) => unknown;
        progress_onCmt?: (progress: Progress) => unknown;
        progress_onEnd?: (progress: Progress) => unknown;
        progress_onRem?: (progress: Progress) => unknown;
        progress_onReset?: (progress: Progress) => unknown;
        progress_onShow?: (progress: Progress) => unknown;
    };
    /**
     * Logs an error message.
     * @param {...LoggingsMessage[]} messages - Error messages.
     * @returns {void}
     */
    error(...messages: LoggingsMessage[]): void;
    /**
     * Logs a warning message.
     * @param {...LoggingsMessage[]} messages - Warning messages.
     * @returns {void}
     */
    warn(...messages: LoggingsMessage[]): void;
    /**
     * Logs a log message.
     * @param {...LoggingsMessage[]} messages - Log messages.
     * @returns {void}
     */
    log(...messages: LoggingsMessage[]): void;
    /**
     * Logs an information message.
     * @param {...LoggingsMessage[]} messages - Information messages.
     * @returns {void}
     */
    info(...messages: LoggingsMessage[]): void;
    /**
     * Logs a debug message.
     * @param {...LoggingsMessage[]} messages - Debug messages.
     * @returns {void}
     */
    debug(...messages: LoggingsMessage[]): void;
    /**
     * Only register logs.
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    txt(...messages: LoggingsMessage[]): void;
    /**
     * Table of Console.table
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    table(...messages: LoggingsMessage[]): void;
}
