import SystemExecutor, { AppType } from "../../appl.ts";
import type { LoggingsColors } from "../functions/pallet.ts";
import type { LoggingsLevel } from "../types.ts";
import type { LoggingsPluginData } from "../class/plugin.ts";
import { Formatter } from "../functions/formatter.ts";
import { Timer } from "../functions/timer.ts";
import { Colors } from "../functions/colors.ts";
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

export const LoggingsConsole: LoggingsPluginData<typeof console_defaults> = {
    identify: "LoggingsConsole",
    defaults: console_defaults,
    onMessage(options, current_level, args): void {
        options.level = options.console_level ? options.console_level : options.level;
        if (options.console && current_level >= options.level) {
            let message_csl = Formatter(options.format)[options.disable_colors ? 1 : 0];
            message_csl = Timer(message_csl).format;

            if (!options.disable_colors) {
                if (message_csl.includes("{title}")) {
                    message_csl = message_csl.replace(
                        new RegExp("{title}", 'g'),
                        Colors(options.color, options.title),
                    );
                }
                if (message_csl.includes("{status}")) {
                    message_csl = message_csl.replace(
                        new RegExp("{status}", 'g'),
                        Colors(
                            options.status[current_level],
                            Colors("bold", current_level),
                        ),
                    );
                }
                if (message_csl.includes("{message}")) {
                    message_csl = message_csl.replace(
                        new RegExp("{message}", 'g'),
                        Formatter(...args)[0],
                    );
                }
            } else {
                if (message_csl.includes("{title}")) {
                    message_csl = message_csl.replace(
                        new RegExp("{title}", 'g'),
                        options.title,
                    );
                }
                if (message_csl.includes("{status}")) {
                    message_csl = message_csl.replace(
                        new RegExp("{status}", 'g'),
                        current_level,
                    );
                }
                if (message_csl.includes("{message}")) {
                    message_csl = message_csl.replace(
                        new RegExp("{message}", 'g'),
                        Formatter(...args)[1],
                    );
                }
            }
            logger(current_level, message_csl);
        }
    }
};

function logger(type: LoggingsLevel, message: string) {
    switch (SystemExecutor) {
        case AppType.Deno: {
            const encoder = new TextEncoder();
            const output = encoder.encode(`${message}\n`);
            if (!["info", "debug"].includes(type.toLowerCase())) {
                //@ts-ignore Ignore Deno
                Deno.stderr.write(output);
            } else {
                //@ts-ignore Ignore Deno
                Deno.stdout.write(output);
            }
            break;
        }
        case AppType.Node: {
            if (!["info", "debug"].includes(type.toLowerCase())) {
                //@ts-ignore Ignore process of node js
                process.stderr.write(`${message}\n`);
            } else {
                //@ts-ignore Ignore process of node js
                process.stdout.write(`${message}\n`);
            }
            break;
        }
        case AppType.Bun: {
            if (!["info", "debug"].includes(type.toLowerCase())) {
                //@ts-ignore Ignore Bun
                Bun.write(Bun.stderr, `${message}\n`);
            } else {
                //@ts-ignore Ignore Bun
                Bun.write(Bun.stdout, `${message}\n`);
            }
            break;
        }
        case AppType.Browser: {
            // Navegador usa console para logging
            console[type.toLowerCase() as LoggingsLevel](message);
            break;
        }
        default: {
            throw new Error("Unknown environment");
        }
    }
}


export type LoggingsConsoleConfig = {
    /**
     * Format log Message, Console print.
     *
     * Main Args:  {status} | {message} | {title}
     *
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     *
     * Default: [{status}] [{{hours}:{minutes}:{seconds}}].gray {message}
     */
    format: string;
    /** 
     * Loggings Level
     * Console-specific level will be used, if not used
     * will use the global "level"
     */
    console_level?: LoggingsLevel;
    /**
     * Status colors
     */
    status: Record<string, keyof typeof LoggingsColors>;
    /**
     * Add new Colors code(ansi or rgb code colors), used in logs functions,
     * e.g:
     * ```ts
     * const logger = new Loggings();
     * LoggingsConfig({
     *     colors: {
     *          "ngreen": Rgb(57, 255, 20) // Neon Green
     *     }
     * })
     * logger.log("[Hello].ngreen")
     * ```
     */
    colors?: Record<string, string>;
    /**
     * If any color using the [].color declaration is wrong,
     * we will use that color instead.
     */
    color_fallback: keyof typeof LoggingsColors;
    /**
     * In some types of hosting, the terminal does not support
     * ansi colors or uses the terminal to display logs.
     * The loggings module uses arguments that apply colors to the terminal
     * using ansi codes, which can make logs difficult to read when saved in
     * .txt files due to the presence of several random characters.
     *
     * To solve this problem, this boolean has been added, that,
     * when activated, causes the loggings module to ignore the color codes
     * and imprint simple logs on the terminal, without color formatting.
     *
     * Hosts that this boolean becomes useful:
     * [Discloud, Squarecloud]
     */
    disable_colors: boolean;
    /**
     * Global Level for show/register logs,
     * Used if console_level or register_level are not set
     * Suported Levels: "error" | "warn" | "info" | "debug"
     */
    level: LoggingsLevel;
    /**
     * Allows show logs in terminal
     */
    console: boolean;
    /**
     * Title show in {title} arg, but is used in logs register.
     * Case "register" is allowed
     */
    title: string;
    /**
     * Color in {title} arg, only visual.
     */
    color: keyof typeof LoggingsColors;
};

