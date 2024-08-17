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
exports.LoggingsColors = exports.ColorsBg = exports.ColorsTxT = void 0;
/**
 * Loggings Defaults Configurations.
 */
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const Loggings_1 = require("../Loggings");
const Colors_1 = require("./Colors");
/**
 * Default configurations of Loggings
 */
const LoggingsDefaults = {
    format: '[{status}] {title} [{hours}:{minutes}:{seconds}].gray {message}',
    console: true,
    level: "Debug",
    color_fallback: "cyan",
    remove_colors: false,
    logger(contents, type) {
        if (["info", "debug"].includes(type)) {
            process.stdout.write(contents.formatted + "\n");
        }
        else {
            process.stderr.write(contents.formatted + "\n");
        }
    },
    controller_title: 'All',
    controller_color: "cyan",
    register: true,
    register_del: true,
    register_limit: 10,
    register_dir: './logs',
    register_locale_file: '{register_dir}/{title}/{status}',
    register_filename: "{day}_{month}_{year}_{status}.{ext}",
    register_format: '[ {day}/{month}/{year}-{hours}:{minutes}:{seconds} ] [ _.{title}._ ] {message}',
    register_type: 'log',
    status_colors: {
        Debug: {
            color: "magenta",
            bg: "none"
        },
        Info: {
            color: "blue",
            bg: "none"
        },
        Warn: {
            color: "yellow",
            bg: "none"
        },
        Error: {
            color: "red",
            bg: "none"
        },
    },
    progress_format: " {progress}% [{bar}].red | [{current}].blue/[{total}].green TIME:[{progress_time}].gray|ETA:[{progress_eta}].red - {message}",
    progress_size: 50,
    progress_bar: "=",
    progress_mili: true,
    progress_show: true
};
exports.ColorsTxT = {
    red: (0, Colors_1.Rgb)(255, 0, 0),
    green: (0, Colors_1.Rgb)(0, 255, 0),
    lime: (0, Colors_1.Rgb)(128, 255, 128),
    blue: (0, Colors_1.Rgb)(0, 0, 255),
    yellow: (0, Colors_1.Rgb)(255, 255, 0),
    cyan: (0, Colors_1.Rgb)(0, 255, 255),
    magenta: (0, Colors_1.Rgb)(255, 0, 255),
    black: (0, Colors_1.Rgb)(0, 0, 0),
    white: (0, Colors_1.Rgb)(255, 255, 255),
    gray: (0, Colors_1.Rgb)(128, 128, 128),
    maroon: (0, Colors_1.Rgb)(128, 0, 0),
    olive: (0, Colors_1.Rgb)(128, 128, 0),
    navy: (0, Colors_1.Rgb)(0, 0, 128),
    purple: (0, Colors_1.Rgb)(128, 0, 128),
    teal: (0, Colors_1.Rgb)(0, 128, 128),
    silver: (0, Colors_1.Rgb)(192, 192, 192),
    indigo: (0, Colors_1.Rgb)(75, 0, 130),
    gold: (0, Colors_1.Rgb)(255, 215, 0),
    pink: (0, Colors_1.Rgb)(255, 192, 203),
    orange: (0, Colors_1.Rgb)(255, 165, 0),
    brown: (0, Colors_1.Rgb)(165, 42, 42),
    peach: (0, Colors_1.Rgb)(255, 218, 185),
    lavender: (0, Colors_1.Rgb)(230, 230, 250),
};
exports.ColorsBg = {
    bred: (0, Colors_1.Bgc)(255, 0, 0),
    bgreen: (0, Colors_1.Bgc)(0, 255, 0),
    blime: (0, Colors_1.Bgc)(128, 255, 128),
    bblue: (0, Colors_1.Bgc)(0, 0, 255),
    byellow: (0, Colors_1.Bgc)(255, 255, 0),
    bcyan: (0, Colors_1.Bgc)(0, 255, 255),
    bmagenta: (0, Colors_1.Bgc)(255, 0, 255),
    bblack: (0, Colors_1.Bgc)(0, 0, 0),
    bwhite: (0, Colors_1.Bgc)(255, 255, 255),
    bgray: (0, Colors_1.Bgc)(128, 128, 128),
    bmaroon: (0, Colors_1.Bgc)(128, 0, 0),
    bolive: (0, Colors_1.Bgc)(128, 128, 0),
    bnavy: (0, Colors_1.Bgc)(0, 0, 128),
    bpurple: (0, Colors_1.Bgc)(128, 0, 128),
    bteal: (0, Colors_1.Bgc)(0, 128, 128),
    bsilver: (0, Colors_1.Bgc)(192, 192, 192),
    bindigo: (0, Colors_1.Bgc)(75, 0, 130),
    bgold: (0, Colors_1.Bgc)(255, 215, 0),
    bpink: (0, Colors_1.Bgc)(255, 192, 203),
    borange: (0, Colors_1.Bgc)(255, 165, 0),
    bbrown: (0, Colors_1.Bgc)(165, 42, 42),
    bpeach: (0, Colors_1.Bgc)(255, 218, 185),
    blavender: (0, Colors_1.Bgc)(230, 230, 250),
};
/**
 * Declared Colors
 */
exports.LoggingsColors = {
    inverse: "\x1b[7m",
    none: "none",
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    ...exports.ColorsBg,
    ...exports.ColorsTxT
};
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
