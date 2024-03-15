import { LoggingsColors } from "./defaults";
import { LoggingsMessage } from "./types";
/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns
 */
export declare function Colors(colorKey: keyof typeof LoggingsColors, text: LoggingsMessage): string;
