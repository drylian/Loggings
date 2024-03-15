"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colors = void 0;
const defaults_1 = require("./defaults");
/**
 * Loggings Internal Colors, simple Loggings color system
 * @param colorKey Color key
 * @param text LoggingsText
 * @returns
 */
function Colors(colorKey, text) {
    const color = defaults_1.LoggingsColors[colorKey];
    if (color) {
        return color + text + defaults_1.LoggingsColors.reset;
    }
    else {
        return text;
    }
}
exports.Colors = Colors;
