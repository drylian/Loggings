import { LoggingsController, LoggingsDefaultConfig, LoggingsMessage } from "../../types";
/**
 * Register Log type
 * @param options
 * @param args
 */
export declare function LoggingsRegisterLog(options: LoggingsDefaultConfig & LoggingsController, args: LoggingsMessage[]): string;
/**
 * Register Log file
 * @param options
 * @param args
 */
export declare function LoggingsRegisterLogFile(options: LoggingsDefaultConfig & LoggingsController, message: string): void;
