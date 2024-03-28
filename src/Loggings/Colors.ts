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
    if(color == "none") return text as string; 
    if (color) {
        return color + text + LoggingsColors.reset;
    } else {
        return text as string;
    }
}

/**
 * Background RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns 
 */
export const Bgc = (r: number, g: number, b: number) => {
    const colors = [r, g, b]
    for (const key of colors) {
        const color = colors[key]
        if (color > 255) colors[key] = 255;
        else if (color < 1) colors[key] = 1;
    }
    return `\x1b[48;2;${colors[0]};${colors[1]};${colors[2]}m`
};

/**
 * Text RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns 
 */
export const Rgb = (r: number, g: number, b: number) => {
    const colors = [r, g, b]
    for (const key of colors) {
        const color = colors[key]
        if (color > 255) colors[key] = 255;
        else if (color < 1) colors[key] = 1;
    }
    return `\x1b[38;2;${colors[0]};${colors[1]};${colors[2]}m`;
};