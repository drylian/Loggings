import defaults, { LoggingsColors } from "./defaults";

/**
 * Type of logs
 */
export type LoggingsMessage = string | boolean | object | number

/**
 * value in LoggingsLevels
 */
export type LoggingsLevel = keyof ReturnType<typeof defaults>['status_colors'];

/**
 * Loggings Supported colors logs
 */
export type LoggingsColor = { color: keyof typeof LoggingsColors, bg: keyof typeof LoggingsColors };

/**
 * Loggings Default Config types
 */
export type LoggingsDefaultConfig = {
    /**
     * Format log Message,Console print.
     * 
     * Main Args:  {status} | {message} | {title}
     * 
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     * 
     * Default: [{status}] [{{hours}:{minutes}:{seconds}}].gray {message}
     */
    format: string;
    /**
     * Change Status default colors, use ansi Colors
     */
    status_colors: {
        Debug: LoggingsColor,
        Info: LoggingsColor,
        Warn: LoggingsColor,
        Error: LoggingsColor,
    }
    /**
     * If any color using the [].color declaration is wrong,
     * we will use that color instead.
     */
    color_fallback: keyof typeof LoggingsColors;
    /**
     * Level for show/register logs,
     * 
     * Suported Levels: "Error" | "Warn" | "Info" | "Debug"
     */
    level: LoggingsLevel;
    /**
     * Allows show logs in terminal
     */
    console: boolean
    /**
     * Title show in {title} arg, but is used in logs register.
     * Case "register" is allowed
     */
    controller_title: string;
    /**
     * Color in {title} arg, only visual.
     */
    controller_color: keyof typeof LoggingsColors;
    /**
     * Allows register logs in file, on {register_dir}
     */
    register: boolean;
    /**
     * Allows you to delete the logs, if you exceed the limit configured
     * in "register_limit", if "register_limit" is 0, it will be ignored
     */
    register_del: boolean;
    /**
     * Sets how many log files will be needed to start deleting old files,
     * if "register_del" is disabled or the value set is 0,
     * this option will be ignored
     */
    register_limit: number;
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
    remove_colors: boolean;
    /**
     * Directory where the files will be stored, if "register" is disabled, it will be ignored
     */
    register_dir: string;
    /**
     * Register Format locale file.
     * 
     * Suported Args:  {register_dir} | {status} | {title}
     * 
     * Default: {register_dir}/{title}/{status}
     */
    register_locale_file: string;
    /**
     * Register Format, in registration logs,
     * 
     * Main Args:  {status} | {message} | {title}
     * 
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     * 
     * Default: [ {day}/{month}/{year} ás {hours}:{minutes}:{seconds} ] [ _.{title}._ ]{message}
     */
    register_format: string;
    /**
     * Method used in registration logs, default is "log"
     */
    register_type: "log" | "json";
} & ProgressType;

export type LoggingsOptionalConfig = Partial<LoggingsDefaultConfig>

/**
 * Partial of LoggingsDefaultConfig
 */
export type LoggingsController = LoggingsOptionalConfig & {
    current_level: LoggingsLevel;
    register_text?: boolean;
}

export type ProgressType = {
    /**
     * Progress Bar default format
     * Arguments:
     * 
     * {progress} - Porcent of bar
     * 
     * {bar} - Bar Style
     * 
     * {current} - current Value of bar
     * 
     * {total} - total Value of bar
     * 
     * {progress_time} - current progress time
     * 
     * {progress_eta} - estimated time for completion
     * 
     * {message} - Message for cmt
     * 
     * Default:{progress}% [{bar}].red | [{current}].blue/[{total}].green TIME:[{progress_time}].gray|ETA:[{progress_eta}].red - {message}
     */
    progress_format: string,
    /**
     * Progress Bar default size
     */
    progress_size: number,
    /**
     * Progress Bar base
     */
    progress_bar: string,
    /**
     * Progress Mili enable;
     */
    progress_mili: boolean,
    /**
     * [Optional] Progress Fixed total and current value "visual", not value;
     */
    progress_fixed?: number,
}