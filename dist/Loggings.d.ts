/**
 * Module Loggings.
 * @module Loggings
 */
export * from "./Loggings/index";
import { Progress } from "./Loggings";
import { LoggingsColors } from "./Loggings/defaults";
import { LoggingsColor, LoggingsDefaultConfig, LoggingsMessage } from "./Loggings/types";
/**
 * Loggings Rework, version 3.5
 * @class
 * @classdesc Class for logging and controlling logs.
 */
export declare class Loggings {
    static progress: typeof Progress;
    /**
     * Loggings Options
     */
    private options;
    /**
     * Creates an instance of Loggings.
     * @constructor
     * @param {string} Controller - The title of the controller.
     * @param {LoggingsColor} Color - The color of the controller.
     * @param {Partial<LoggingsDefaultConfig>} options - Additional configuration options.
     */
    constructor(Controller?: string, Color?: keyof typeof LoggingsColors, options?: Partial<LoggingsDefaultConfig>);
    /**
     * Loggings metadata Arguments
     */
    get meta(): {
        format: string;
        status_colors: {
            Debug: LoggingsColor;
            Info: LoggingsColor;
            Warn: LoggingsColor;
            Error: LoggingsColor;
        };
        color_fallback: "none" | "red" | "green" | "lime" | "blue" | "yellow" | "cyan" | "magenta" | "black" | "white" | "gray" | "maroon" | "olive" | "navy" | "purple" | "teal" | "silver" | "indigo" | "gold" | "pink" | "orange" | "brown" | "peach" | "lavender" | "bred" | "bgreen" | "blime" | "bblue" | "byellow" | "bcyan" | "bmagenta" | "bblack" | "bwhite" | "bgray" | "bmaroon" | "bolive" | "bnavy" | "bpurple" | "bteal" | "bsilver" | "bindigo" | "bgold" | "bpink" | "borange" | "bbrown" | "bpeach" | "blavender" | "inverse" | "reset" | "bold";
        level: "Debug" | "Info" | "Warn" | "Error";
        console: boolean;
        controller_title: string;
        controller_color: "none" | "red" | "green" | "lime" | "blue" | "yellow" | "cyan" | "magenta" | "black" | "white" | "gray" | "maroon" | "olive" | "navy" | "purple" | "teal" | "silver" | "indigo" | "gold" | "pink" | "orange" | "brown" | "peach" | "lavender" | "bred" | "bgreen" | "blime" | "bblue" | "byellow" | "bcyan" | "bmagenta" | "bblack" | "bwhite" | "bgray" | "bmaroon" | "bolive" | "bnavy" | "bpurple" | "bteal" | "bsilver" | "bindigo" | "bgold" | "bpink" | "borange" | "bbrown" | "bpeach" | "blavender" | "inverse" | "reset" | "bold";
        register: boolean;
        register_del: boolean;
        register_limit: number;
        register_dir: string;
        register_locale_file: string;
        register_format: string;
        register_type: "log" | "json";
        progress_format: string;
        progress_size: number;
        progress_bar: string;
        progress_mili: boolean;
        progress_fixed?: number;
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
}
