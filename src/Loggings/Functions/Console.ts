import defaults from "../defaults";
import { LoggingsColor, LoggingsMessage } from "../types";
import { Timer } from "./Timer";
import { Formatter } from "./Formatter";
import { Colors } from "../Colors";

/**
 * Isolated Console, not register, only uses basics configurations
 * Warning: Console not have {title} argument, is removed in "format"
 * @param title Controller
 * @param color Color
 * @param args LoggingsMessage
 */
export function Console(status: string, color: LoggingsColor, ...args: LoggingsMessage[]) {
    let format = defaults().format
    format = Timer(format).format
    format = Formatter([format]).message_csl
    if (format.includes("{status}")) {
        format = format.replaceAll("{status}", Colors(color, status));
    }
    if (format.includes("{title}")) {
        format = format.replaceAll("{title}", "");
    }
    if (format.includes("{message}")) {
        format = format.replaceAll("{message}", Formatter(args).message_csl);
    }
    console.info(format);
}