"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loggings = exports.LoggingsConfig = void 0;
/**
 * Module Loggings.
 * @module Loggings
 */
__exportStar(require("./Loggings/index"), exports);
const Loggings_1 = require("./Loggings");
const Controller_1 = require("./Loggings/Controller");
const defaults_1 = __importDefault(require("./Loggings/defaults"));
/**
 * Updates Global configs of Loggings,
 * Update this update in real time all standard settings
 * of all instances started by Loggings, more remember,
 * if instance has a custom configuration that overlaps
 * the default configuration (custom settings) will need
 * to change the instance us using .config(configs).
 */
function LoggingsConfig(config) {
    Loggings._default_configurations = {
        ...Loggings._default_configurations,
        ...config
    };
}
exports.LoggingsConfig = LoggingsConfig;
/**
 * Loggings Rework, version 3.5
 * @class
 * @classdesc Class for logging and controlling logs.
 */
class Loggings {
    static _default_configurations = (0, defaults_1.default)();
    static progress = Loggings_1.Progress;
    /**
     * Updates Loggings config
     */
    config(config) {
        this.options = {
            ...config
        };
    }
    /**
     * Only show Custom infos of loggings,
     * To show all the settings use the const meta
     */
    options;
    /**
     * Creates an instance of Loggings.
     * @constructor
     * @param {string} Controller - The title of the controller.
     * @param {LoggingsColor} Color - The color of the controller.
     * @param {Partial<LoggingsDefaultConfig>} options - Additional configuration options.
     */
    constructor(Controller = "All", Color = "blue", options) {
        this.options = {
            controller_title: Controller,
            controller_color: Color,
            ...options
        };
    }
    /**
     * Loggings metadata Arguments
     */
    get meta() {
        return {
            ...Loggings._default_configurations,
            ...this.options
        };
    }
    /**
     * Logs an error message.
     * @param {...LoggingsMessage[]} messages - Error messages.
     * @returns {void}
     */
    error(...messages) {
        (0, Controller_1.Controller)({ ...this.options, current_level: "Error" }, messages);
    }
    /**
     * Logs a warning message.
     * @param {...LoggingsMessage[]} messages - Warning messages.
     * @returns {void}
     */
    warn(...messages) {
        (0, Controller_1.Controller)({ ...this.options, current_level: "Warn" }, messages);
    }
    /**
     * Logs a log message.
     * @param {...LoggingsMessage[]} messages - Log messages.
     * @returns {void}
     */
    log(...messages) {
        (0, Controller_1.Controller)({ ...this.options, current_level: "Info" }, messages);
    }
    /**
     * Logs an information message.
     * @param {...LoggingsMessage[]} messages - Information messages.
     * @returns {void}
     */
    info(...messages) {
        (0, Controller_1.Controller)({ ...this.options, current_level: "Info" }, messages);
    }
    /**
     * Logs a debug message.
     * @param {...LoggingsMessage[]} messages - Debug messages.
     * @returns {void}
     */
    debug(...messages) {
        (0, Controller_1.Controller)({ ...this.options, current_level: "Debug" }, messages);
    }
    /**
     * Only register logs.
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    txt(...messages) {
        (0, Controller_1.Controller)({ ...this.options, current_level: "Info", register_text: true, console: false }, messages);
    }
    /**
     * Table of Console.table
     * @param {...LoggingsMessage[]} messages - Text messages.
     * @returns {void}
     */
    table(...messages) {
        console.table(messages);
    }
}
exports.Loggings = Loggings;
