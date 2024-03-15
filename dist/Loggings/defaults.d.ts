import { LoggingsDefaultConfig } from "./types";
/**
 * Declared Colors
 */
export declare enum LoggingsColors {
    reset = "\u001B[0m",
    bold = "\u001B[1m",
    bright = "\u001B[1m",
    dim = "\u001B[2m",
    underscore = "\u001B[4m",
    blink = "\u001B[5m",
    reverse = "\u001B[7m",
    hidden = "\u001B[8m",
    black = "\u001B[30m",
    red = "\u001B[31m",
    green = "\u001B[32m",
    gray = "\u001B[90m",
    yellow = "\u001B[33m",
    blue = "\u001B[34m",
    magenta = "\u001B[35m",
    cyan = "\u001B[36m",
    white = "\u001B[37m",
    bgBlack = "\u001B[40m",
    bgRed = "\u001B[41m",
    bgGreen = "\u001B[42m",
    bgYellow = "\u001B[43m",
    bgBlue = "\u001B[44m",
    bgMagenta = "\u001B[45m",
    bgCyan = "\u001B[46m",
    bgWhite = "\u001B[47m",
    fgGray = "\u001B[90m",
    bgGray = "\u001B[100m",
    fgBlackBright = "\u001B[90m",
    fgRedBright = "\u001B[91m",
    fgGreenBright = "\u001B[92m",
    fgYellowBright = "\u001B[93m",
    fgBlueBright = "\u001B[94m",
    fgMagentaBright = "\u001B[95m",
    fgCyanBright = "\u001B[96m",
    fgWhiteBright = "\u001B[97m",
    bgBlackBright = "\u001B[100m",
    bgRedBright = "\u001B[101m"
}
/**
 * DefaultLoggings Arguments function
 */
declare const _default: () => LoggingsDefaultConfig;
export default _default;
