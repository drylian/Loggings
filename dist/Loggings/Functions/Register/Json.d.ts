import { LoggingsController, LoggingsDefaultConfig, LoggingsMessage } from "../../types";
/**
 * Register Log type
 * @param options
 * @param args
 */
export declare function LoggingsRegisterJson(options: LoggingsDefaultConfig & LoggingsController, args: LoggingsMessage[]): {
    title: string;
    level: "Debug" | "Info" | "Warn" | "Error";
    message: string;
    time: number;
};
/**
 * Register Json file
 * @param options
 * @param args
 */
export declare function LoggingsRegisterJsonFile(options: LoggingsDefaultConfig & LoggingsController, message: object): void;
