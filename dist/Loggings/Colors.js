"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rgb = exports.Bgc = exports.Colors = void 0;
const defaults_1 = require("./defaults");
/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns
 */
function Colors(colorKey, text) {
    const color = defaults_1.LoggingsColors[colorKey];
    if (color == "none")
        return text;
    if (color) {
        return color + text + defaults_1.LoggingsColors.reset;
    }
    else {
        return text;
    }
}
exports.Colors = Colors;
/**
 * Background RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns
 */
const Bgc = (r, g, b) => {
    const colors = [r, g, b];
    for (const key of colors) {
        const color = colors[key];
        if (color > 255)
            colors[key] = 255;
        else if (color < 1)
            colors[key] = 1;
    }
    return `\x1b[48;2;${colors[0]};${colors[1]};${colors[2]}m`;
};
exports.Bgc = Bgc;
/**
 * Text RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns
 */
const Rgb = (r, g, b) => {
    const colors = [r, g, b];
    for (const key of colors) {
        const color = colors[key];
        if (color > 255)
            colors[key] = 255;
        else if (color < 1)
            colors[key] = 1;
    }
    return `\x1b[38;2;${colors[0]};${colors[1]};${colors[2]}m`;
};
exports.Rgb = Rgb;
