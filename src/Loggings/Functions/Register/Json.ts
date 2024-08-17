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
    const JsonFileName = Timer(options.register_filename).format
    .replaceAll("{status}", options.current_level).replaceAll(
        "{ext}",
        "json",
    );
    const JsonFilePath = path.join(options.register_locale_file, JsonFileName);
    let data: Record<string, object[]> = {};
    if (fs.existsSync(JsonFilePath)) data = JSON.parse(fs.readFileSync(JsonFilePath, "utf-8"));
    const logCounter = Object.keys(data).length + 1;
    data[`case_${logCounter}`] = [message];
    fs.writeFileSync(JsonFilePath, JSON.stringify(data, null, 2), { flag: "w" });
}