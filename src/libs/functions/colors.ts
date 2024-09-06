import { LoggingsMessage } from "../types.ts";
import { LoggingsColors } from "./pallet.ts";

/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns
 */
export function Colors(
    colorKey: keyof typeof LoggingsColors,
    text: LoggingsMessage,
    extra_colors?: Record<string, string>,
): string {
    const colors = Object.assign(LoggingsColors, extra_colors);
    const color = colors[colorKey];
    if (color == "none") return text as string;
    if (color) {
        return color + text + colors.reset;
    } else {
        return text as string;
    }
}
