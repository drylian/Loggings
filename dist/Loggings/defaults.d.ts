import { LoggingsDefaultConfig } from "./types";
export declare const ColorsTxT: {
    readonly red: string;
    readonly green: string;
    readonly lime: string;
    readonly blue: string;
    readonly yellow: string;
    readonly cyan: string;
    readonly magenta: string;
    readonly black: string;
    readonly white: string;
    readonly gray: string;
    readonly maroon: string;
    readonly olive: string;
    readonly navy: string;
    readonly purple: string;
    readonly teal: string;
    readonly silver: string;
    readonly indigo: string;
    readonly gold: string;
    readonly pink: string;
    readonly orange: string;
    readonly brown: string;
    readonly peach: string;
    readonly lavender: string;
};
export declare const ColorsBg: {
    readonly bred: string;
    readonly bgreen: string;
    readonly blime: string;
    readonly bblue: string;
    readonly byellow: string;
    readonly bcyan: string;
    readonly bmagenta: string;
    readonly bblack: string;
    readonly bwhite: string;
    readonly bgray: string;
    readonly bmaroon: string;
    readonly bolive: string;
    readonly bnavy: string;
    readonly bpurple: string;
    readonly bteal: string;
    readonly bsilver: string;
    readonly bindigo: string;
    readonly bgold: string;
    readonly bpink: string;
    readonly borange: string;
    readonly bbrown: string;
    readonly bpeach: string;
    readonly blavender: string;
};
/**
 * Declared Colors
 */
export declare const LoggingsColors: {
    readonly red: string;
    readonly green: string;
    readonly lime: string;
    readonly blue: string;
    readonly yellow: string;
    readonly cyan: string;
    readonly magenta: string;
    readonly black: string;
    readonly white: string;
    readonly gray: string;
    readonly maroon: string;
    readonly olive: string;
    readonly navy: string;
    readonly purple: string;
    readonly teal: string;
    readonly silver: string;
    readonly indigo: string;
    readonly gold: string;
    readonly pink: string;
    readonly orange: string;
    readonly brown: string;
    readonly peach: string;
    readonly lavender: string;
    readonly bred: string;
    readonly bgreen: string;
    readonly blime: string;
    readonly bblue: string;
    readonly byellow: string;
    readonly bcyan: string;
    readonly bmagenta: string;
    readonly bblack: string;
    readonly bwhite: string;
    readonly bgray: string;
    readonly bmaroon: string;
    readonly bolive: string;
    readonly bnavy: string;
    readonly bpurple: string;
    readonly bteal: string;
    readonly bsilver: string;
    readonly bindigo: string;
    readonly bgold: string;
    readonly bpink: string;
    readonly borange: string;
    readonly bbrown: string;
    readonly bpeach: string;
    readonly blavender: string;
    readonly inverse: "\u001B[7m";
    readonly none: "none";
    readonly reset: "\u001B[0m";
    readonly bold: "\u001B[1m";
};
/**
 * DefaultLoggings Arguments function
 */
declare const _default: () => LoggingsDefaultConfig;
export default _default;
/**
 * Updates Global configs of Loggings,
 * Update this update in real time all standard settings
 * of all instances started by Loggings, more remember,
 * if instance has a custom configuration that overlaps
 * the default configuration (custom settings) will need
 * to change the instance us using .config(configs).
 */
export declare function LoggingsConfig(config: Partial<LoggingsDefaultConfig>): void;
