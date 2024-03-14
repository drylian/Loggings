import { LoggingsColors } from "./defaults";
import { LoggingsMessage } from "./types";
/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns 
 */
export function Colors(colorKey: keyof typeof LoggingsColors, text: LoggingsMessage): string {
    const color = LoggingsColors[colorKey];
    if (color) {
        return color + text + LoggingsColors.reset;
    } else {
        return text as string;
    }
}
