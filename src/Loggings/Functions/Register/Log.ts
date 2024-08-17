import path from "path";
import {
    LoggingsController,
    LoggingsDefaultConfig,
    LoggingsMessage,
} from "../../types";
import { Formatter } from "../Formatter";
import { Timer } from "../Timer";
import fs from "fs";
/**
 * Register Log type
 * @param options
 * @param args
 */
export function LoggingsRegisterLog(
    options: LoggingsDefaultConfig & LoggingsController,
    args: LoggingsMessage[],
) {
    let message_rgt = options.register_format;
    message_rgt = Timer(message_rgt).format;
    if (message_rgt.includes("{title}")) {
        message_rgt = message_rgt.replaceAll(
            "{title}",
            options.controller_title,
        );
    }
    if (message_rgt.includes("{status}")) {
        message_rgt = message_rgt.replaceAll("{status}", options.current_level);
    }
    if (message_rgt.includes("{message}")) {
        message_rgt = message_rgt.replaceAll(
            "{message}",
            Formatter(args).message_rgt,
        );
    }
    return message_rgt;
}

/**
 * Register Log file
 * @param options
 * @param args
 */
export function LoggingsRegisterLogFile(
    options: LoggingsDefaultConfig & LoggingsController,
    message: string,
) {
    const logFileName = Timer(options.register_filename).format
        .replaceAll("{status}", options.current_level).replaceAll(
            "{ext}",
            "log",
        );
    const logFilePath = path.join(options.register_locale_file, logFileName);
    fs.appendFileSync(logFilePath, message + "\n");
}
