import path, { resolve } from "path";
import { LoggingsController, LoggingsDefaultConfig } from "../types";
import fs from "fs";
import { LoggingsRegisterLogFile } from "./Register/Log";
import { LoggingsRegisterJsonFile } from "./Register/Json";
import { Unlinker } from "./Unlinker";

/**
 * Register 
 * @param options Loggings Configurations
 * @param message Formatted Message 
 */
export function Register(options: LoggingsDefaultConfig & LoggingsController, message: string | object) {
    const logFolderPath = resolve(path.join(options.register_locale_file));
    if (!fs.existsSync(logFolderPath)) { fs.mkdirSync(logFolderPath, { recursive: true }) }
    if (options.register_type === "log" && typeof message === "string") {
        LoggingsRegisterLogFile(options, message);
    } else if (options.register_type === "json" && typeof message === "object") {
        LoggingsRegisterJsonFile(options, message);
    }
    Unlinker(options, logFolderPath);
}