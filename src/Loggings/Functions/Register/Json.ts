import path from "path";
import { LoggingsController, LoggingsDefaultConfig, LoggingsMessage } from "../../types";
import { Formatter } from "../Formatter";
import { Timer } from "../Timer";
import fs from "fs";

/**
 * Register Log type
 * @param options 
 * @param args 
 */
export function LoggingsRegisterJson(options: LoggingsDefaultConfig & LoggingsController, args: LoggingsMessage[]) {
    let message_rgt = {
        title: options.controller_title,
        level: options.current_level,
        message: Formatter(args).message_rgt,
        time: Date.now()
    }
    return message_rgt
}

/**
 * Register Json file
 * @param options 
 * @param args 
 */
export function LoggingsRegisterJsonFile(options: LoggingsDefaultConfig & LoggingsController, message: object) {
    const timer = Timer("").timer
    const logFileName = `${timer.day}_${timer.month}_${timer.year}_${options.current_level}.log`;
    const logFilePath = path.join(options.register_locale_file, logFileName);
    let data: Record<string, object[]> = {};
    if (fs.existsSync(logFilePath)) data = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
    const logCounter = Object.keys(data).length + 1;
    data[`case_${logCounter}`] = [message];
    fs.writeFileSync(logFilePath, JSON.stringify(data, null, 2), { flag: "w" });
}