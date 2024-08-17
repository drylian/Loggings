/**
 * Loggings Defaults Configurations.
 */
import path from "path";
import { LoggingsDefaultConfig } from "./types"
import * as fs from "fs";
import { Formatter } from "../Loggings";
import { Bgc, Rgb } from "./Colors";
/**
 * Default configurations of Loggings
 */
const LoggingsDefaults: LoggingsDefaultConfig = {
    format: '[{status}] {title} [{hours}:{minutes}:{seconds}].gray {message}',
    console: true,
    level: "Debug",
    color_fallback: "cyan",
    remove_colors: false,
    logger(contents, type) {
        if (["info", "debug"].includes(type)) {
            process.stdout.write(contents.formatted + "\n");
        } else {
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
    register_filename:"{day}_{month}_{year}_{status}.{ext}",
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
    progress_show:true
}

export const ColorsTxT = {
    red: Rgb(255, 0, 0),
    green: Rgb(0, 255, 0),
    lime: Rgb(128, 255, 128),
    blue: Rgb(0, 0, 255),
    yellow: Rgb(255, 255, 0),
    cyan: Rgb(0, 255, 255),
    magenta: Rgb(255, 0, 255),
    black: Rgb(0, 0, 0),
    white: Rgb(255, 255, 255),
    gray: Rgb(128, 128, 128),
    maroon: Rgb(128, 0, 0),
    olive: Rgb(128, 128, 0),
    navy: Rgb(0, 0, 128),
    purple: Rgb(128, 0, 128),
    teal: Rgb(0, 128, 128),
    silver: Rgb(192, 192, 192),
    indigo: Rgb(75, 0, 130),
    gold: Rgb(255, 215, 0),
    pink: Rgb(255, 192, 203),
    orange: Rgb(255, 165, 0),
    brown: Rgb(165, 42, 42),
    peach: Rgb(255, 218, 185),
    lavender: Rgb(230, 230, 250),
} as const;


export const ColorsBg = {
    bred: Bgc(255, 0, 0),
    bgreen: Bgc(0, 255, 0),
    blime: Bgc(128, 255, 128),
    bblue: Bgc(0, 0, 255),
    byellow: Bgc(255, 255, 0),
    bcyan: Bgc(0, 255, 255),
    bmagenta: Bgc(255, 0, 255),
    bblack: Bgc(0, 0, 0),
    bwhite: Bgc(255, 255, 255),
    bgray: Bgc(128, 128, 128),
    bmaroon: Bgc(128, 0, 0),
    bolive: Bgc(128, 128, 0),
    bnavy: Bgc(0, 0, 128),
    bpurple: Bgc(128, 0, 128),
    bteal: Bgc(0, 128, 128),
    bsilver: Bgc(192, 192, 192),
    bindigo: Bgc(75, 0, 130),
    bgold: Bgc(255, 215, 0),
    bpink: Bgc(255, 192, 203),
    borange: Bgc(255, 165, 0),
    bbrown: Bgc(165, 42, 42),
    bpeach: Bgc(255, 218, 185),
    blavender: Bgc(230, 230, 250),
} as const;

/**
 * Declared Colors
 */
export const LoggingsColors = {
    inverse: "\x1b[7m",
    none: "none",
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    ...ColorsBg,
    ...ColorsTxT
} as const

/**
 * DefaultLoggings Arguments function
 */
export default (): LoggingsDefaultConfig => {
    let UserOptions = {}
    let optionFILE = "unknown";
    try {
        if (fs.existsSync("./loggings.config.js")) {
            optionFILE = "./loggings.config.js";
            const locale = path.relative(__dirname, path.join(process.cwd(), "./loggings.config.js"))
            UserOptions = require(locale);
        } else if (fs.existsSync("./loggings.config.json")) {
            optionFILE = "./loggings.config.json";
            UserOptions = JSON.parse(fs.readFileSync("./loggings.config.json", "utf-8"));
        } else if (fs.existsSync("./loggings.config.ts")) {
            optionFILE = "./loggings.config.ts";
            const locale = path.relative(__dirname, path.join(process.cwd(), "./loggings.config.ts"))
            const moduler = require(locale).default;
            UserOptions = moduler();
        }
    } catch {
        console.warn(Formatter([`[Warning].yellow-b - [Loggings].green: Error when trying to obtain settings in ([${optionFILE}].red-b), using default settings`]).message_csl);
        return LoggingsDefaults
    }
    return {
        ...LoggingsDefaults,
        ...UserOptions
    }
}