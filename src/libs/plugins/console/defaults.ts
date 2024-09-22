import { LoggingsConsoleConfig } from "./types.ts";

/**
 * Defaults Configurations of Console Plugin
 */
export const console_defaults: LoggingsConsoleConfig = {
    format: "[{status}] {title} [{hours}:{minutes}:{seconds}].gray {message}",
    status: {
        trace: "ncoral",
        error: "nred",
        warn: "nyellow",
        info: "nblue",
        debug: "npurple",
    },
    console: true,
    level: "info",
    color_fallback: "cyan",
    disable_colors: false,
    title: "All",
    color: "cyan",
};
