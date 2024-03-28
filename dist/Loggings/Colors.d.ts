import { LoggingsColors } from "./defaults";
import { LoggingsMessage } from "./types";
/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns
 */
export declare function Colors(colorKey: keyof typeof LoggingsColors, text: LoggingsMessage): string;
/**
 * Background RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns
 */
export declare const Bgc: (r: number, g: number, b: number) => string;
/**
 * Text RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns
 */
export declare const Rgb: (r: number, g: number, b: number) => string;
