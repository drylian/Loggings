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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingsColors = void 0;
/**
 * Loggings Defaults Configurations.
 */
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const Loggings_1 = require("../Loggings");
/**
 * Default configurations of Loggings
 */
const LoggingsDefaults = {
    format: '[{status}] {title} [{hours}:{minutes}:{seconds}].gray {message}',
    console: true,
    level: "Debug",
    color_fallback: "blue",
    controller_title: 'All',
    controller_color: "blue",
    register: true,
    register_del: true,
    register_limit: 10,
    register_dir: './logs',
    register_locale_file: '{register_dir}/{title}/{status}',
    register_format: '[ {day}/{month}/{year}-{hours}:{minutes}:{seconds} ] [ _.{title}._ ] {message}',
    register_type: 'log',
    status_colors: {
        Debug: "magenta",
        Info: "blue",
        Warn: "yellow",
        Error: "red"
    },
    progress_format: " {progress}% [{bar}].red | [{current}].blue/[{total}].green TIME:[{progress_time}].gray|ETA:[{progress_eta}].red - {message}",
    progress_size: 50,
    progress_bar: "=",
    progress_mili: true,
};
/**
 * Declared Colors
 */
var LoggingsColors;
(function (LoggingsColors) {
    LoggingsColors["reset"] = "\u001B[0m";
    LoggingsColors["bold"] = "\u001B[1m";
    LoggingsColors["bright"] = "\u001B[1m";
    LoggingsColors["dim"] = "\u001B[2m";
    LoggingsColors["underscore"] = "\u001B[4m";
    LoggingsColors["blink"] = "\u001B[5m";
    LoggingsColors["reverse"] = "\u001B[7m";
    LoggingsColors["hidden"] = "\u001B[8m";
    LoggingsColors["black"] = "\u001B[30m";
    LoggingsColors["red"] = "\u001B[31m";
    LoggingsColors["green"] = "\u001B[32m";
    LoggingsColors["gray"] = "\u001B[90m";
    LoggingsColors["yellow"] = "\u001B[33m";
    LoggingsColors["blue"] = "\u001B[34m";
    LoggingsColors["magenta"] = "\u001B[35m";
    LoggingsColors["cyan"] = "\u001B[36m";
    LoggingsColors["white"] = "\u001B[37m";
    LoggingsColors["bgBlack"] = "\u001B[40m";
    LoggingsColors["bgRed"] = "\u001B[41m";
    LoggingsColors["bgGreen"] = "\u001B[42m";
    LoggingsColors["bgYellow"] = "\u001B[43m";
    LoggingsColors["bgBlue"] = "\u001B[44m";
    LoggingsColors["bgMagenta"] = "\u001B[45m";
    LoggingsColors["bgCyan"] = "\u001B[46m";
    LoggingsColors["bgWhite"] = "\u001B[47m";
    LoggingsColors["fgGray"] = "\u001B[90m";
    LoggingsColors["bgGray"] = "\u001B[100m";
    LoggingsColors["fgBlackBright"] = "\u001B[90m";
    LoggingsColors["fgRedBright"] = "\u001B[91m";
    LoggingsColors["fgGreenBright"] = "\u001B[92m";
    LoggingsColors["fgYellowBright"] = "\u001B[93m";
    LoggingsColors["fgBlueBright"] = "\u001B[94m";
    LoggingsColors["fgMagentaBright"] = "\u001B[95m";
    LoggingsColors["fgCyanBright"] = "\u001B[96m";
    LoggingsColors["fgWhiteBright"] = "\u001B[97m";
    LoggingsColors["bgBlackBright"] = "\u001B[100m";
    LoggingsColors["bgRedBright"] = "\u001B[101m";
})(LoggingsColors || (exports.LoggingsColors = LoggingsColors = {}));
/**
 * DefaultLoggings Arguments function
 */
exports.default = () => {
    let UserOptions = {};
    let optionFILE = "unknown";
    try {
        if (fs.existsSync("./loggings.config.js")) {
            optionFILE = "./loggings.config.js";
            const locale = path_1.default.relative(__dirname, path_1.default.join(process.cwd(), "./loggings.config.js"));
            UserOptions = require(locale);
        }
        else if (fs.existsSync("./loggings.config.json")) {
            optionFILE = "./loggings.config.json";
            UserOptions = JSON.parse(fs.readFileSync("./loggings.config.json", "utf-8"));
        }
        else if (fs.existsSync("./loggings.config.ts")) {
            optionFILE = "./loggings.config.ts";
            const locale = path_1.default.relative(__dirname, path_1.default.join(process.cwd(), "./loggings.config.ts"));
            const moduler = require(locale).default;
            UserOptions = moduler();
        }
    }
    catch {
        console.warn((0, Loggings_1.Formatter)([`[Warning].yellow-b - [Loggings].green: Error when trying to obtain settings in ([${optionFILE}].red-b), using default settings`]).message_csl);
        return LoggingsDefaults;
    }
    return {
        ...LoggingsDefaults,
        ...UserOptions
    };
};
