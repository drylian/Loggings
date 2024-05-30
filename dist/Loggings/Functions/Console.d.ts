import { LoggingsColors } from "../defaults";
import { LoggingsMessage } from "../types";
/**
 * Isolated Console, not register, only uses basics configurations
 * Warning: Console not have {title} argument, is removed in "format"
 * @param title Controller
 * @param color Color
 * @param args LoggingsMessage
 */
export declare function Console(status: string, color: keyof typeof LoggingsColors, ...args: LoggingsMessage[]): void;
