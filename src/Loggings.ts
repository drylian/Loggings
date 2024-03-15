/**
 * Module Loggings.
 * @module Loggings
 */
export * from "./Loggings/index";
import { Progress } from "./Loggings";
import { Controller } from "./Loggings/Controller";
import defaults from "./Loggings/defaults";
import { LoggingsColor, LoggingsDefaultConfig, LoggingsMessage } from "./Loggings/types";

/**
 * Loggings Rework, version 3.5
 * @class
 * @classdesc Class for logging and controlling logs.
 */
export class Loggings {
    public static progress = Progress
    /**
     * Loggings Options
     */
    private options: Partial<LoggingsDefaultConfig>;
    /**
     * Creates an instance of Loggings.
     * @constructor
     * @param {string} Controller - The title of the controller.
     * @param {LoggingsColor} Color - The color of the controller.
     * @param {Partial<LoggingsDefaultConfig>} options - Additional configuration options.
     */
    constructor(Controller: string = "All", Color: LoggingsColor = "blue", options?: Partial<LoggingsDefaultConfig>) {
        this.options = {
            controller_title: Controller,
            controller_color: Color,
            ...options
        };
    }

    /**
     * Loggings metadata Arguments
     */
    public get meta() {
        return {
            ...defaults(),
            ...this.options
        }
    }

    /**
     * Logs an error message.
     * @param {...LoggingsMessage[]} messages - Error messages.
     * @returns {void}
     */
    public error(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Error" }, messages)
    }
    /**
     * Logs a warning message.
     * @param {...LoggingsMessage[]} messages - Warning messages.
     * @returns {void}
     */
    public warn(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Warn" }, messages)
    }
    /**
     * Logs a log message.
     * @param {...LoggingsMessage[]} messages - Log messages.
     * @returns {void}
     */
    public log(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Info" }, messages)
    }
    /**
     * Logs an information message.
     * @param {...LoggingsMessage[]} messages - Information messages.
     * @returns {void}
     */
    public info(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Info" }, messages)
    }
    /**
     * Logs a debug message.
     * @param {...LoggingsMessage[]} messages - Debug messages.
     * @returns {void}
     */
    public debug(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Debug" }, messages)
    }
    /**
     * Only register logs.
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    public txt(...messages: LoggingsMessage[]): void {
        Controller({ ...this.options, current_level: "Info", register_text: true, console: false }, messages)
    }

}
