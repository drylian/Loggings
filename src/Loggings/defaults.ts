/**
 * Loggings Defaults Configurations.
 */
import path from "path";
import { LoggingsDefaultConfig, LoggingsOptionalConfig } from "./types"
import * as fs from "fs";
import { Colors } from "./Colors";
import { Formatter } from "../Loggings";
/**
 * Default configurations of Loggings
 */
const LoggingsDefaults: LoggingsDefaultConfig = {
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
}
/**
 * Declared Colors
 */
export enum LoggingsColors {
    reset = "\x1b[0m",
    bold = "\x1b[1m",
    bright = "\x1b[1m",
    dim = "\x1b[2m",
    underscore = "\x1b[4m",
    blink = "\x1b[5m",
    reverse = "\x1b[7m",
    hidden = "\x1b[8m",
    black = "\x1b[30m",
    red = "\x1b[31m",
    green = "\x1b[32m",
    gray = "\x1b[90m",
    yellow = "\x1b[33m",
    blue = "\x1b[34m",
    magenta = "\x1b[35m",
    cyan = "\x1b[36m",
    white = "\x1b[37m",
    bgBlack = "\x1b[40m",
    bgRed = "\x1b[41m",
    bgGreen = "\x1b[42m",
    bgYellow = "\x1b[43m",
    bgBlue = "\x1b[44m",
    bgMagenta = "\x1b[45m",
    bgCyan = "\x1b[46m",
    bgWhite = "\x1b[47m",
    fgGray = "\x1b[90m",
    bgGray = "\x1b[100m",
    fgBlackBright = "\x1b[90m",
    fgRedBright = "\x1b[91m",
    fgGreenBright = "\x1b[92m",
    fgYellowBright = "\x1b[93m",
    fgBlueBright = "\x1b[94m",
    fgMagentaBright = "\x1b[95m",
    fgCyanBright = "\x1b[96m",
    fgWhiteBright = "\x1b[97m",
    bgBlackBright = "\x1b[100m",
    bgRedBright = "\x1b[101m",
}

/**
 * DefaultLoggings Arguments function
 */
export default (): LoggingsDefaultConfig => {
    let UserOptions: Function | {} = {}
    let optionFILE= "unknown";
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
