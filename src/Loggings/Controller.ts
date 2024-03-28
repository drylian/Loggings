import { LoggingsController, LoggingsMessage } from "./types";
import defaults from "./defaults";
import { Formatter } from "./Functions/Formatter";
import { Timer } from "./Functions/Timer";
import { Register } from "./Functions/Register";
import { LoggingsRegisterJson } from "./Functions/Register/Json";
import { LoggingsRegisterLog } from "./Functions/Register/Log";
import { Colors } from "./Colors";
/**
 * Main Controller for Loggings
 * @param isolated LoggingsConfigurations
 * @param args LoggingsMessageArgs
 */
export function Controller(isolated: LoggingsController, args: LoggingsMessage[]) {
    /**
     * Merge default options in Partial options
     */
    const options = {
        ...defaults(),
        ...isolated
    }
    /**
     * Check console is allowed
     */
    if (options.console && options.current_level >= options.level) {
        let message_csl = Formatter([options.format]).message_csl
        message_csl = Timer(message_csl).format
        if (message_csl.includes("{title}")) {
            message_csl = message_csl.replaceAll("{title}", Colors(options.controller_color, options.controller_title));
        }
        if (message_csl.includes("{status}")) {
            message_csl = message_csl.replaceAll("{status}", Colors(options.status_colors[options.current_level].bg, Colors(options.status_colors[options.current_level].color, Colors("bold",options.current_level))));
        }
        if (message_csl.includes("{message}")) {
            message_csl = message_csl.replaceAll("{message}", Formatter(args).message_csl);
        }
        console[options.current_level.toLowerCase()](message_csl);
    }
    /**
     * Check register is allowed
     */
    if (options.register && options.current_level >= options.level) {
        let message_rgt: string | object;
        options.register_locale_file = options.register_locale_file.replaceAll("{register_dir}", options.register_dir)
        options.register_locale_file = options.register_locale_file.replaceAll("{title}", options.controller_title)
        if (options.register_text) {
            options.register_locale_file = options.register_locale_file.replaceAll("{status}", "Logs")
        } else {
            options.register_locale_file = options.register_locale_file.replaceAll("{status}", options.current_level)
        }
        if (options.register_type === "log") {
            message_rgt = LoggingsRegisterLog(options, args)
        } else if (options.register_type === "json") {
            message_rgt = LoggingsRegisterJson(options, args)
        } else {
            // default case register_type have invalid method
            message_rgt = LoggingsRegisterLog(options, args)
        }
        Register(options, message_rgt);
    }
}