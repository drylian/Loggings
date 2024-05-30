"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const defaults_1 = require("../defaults");
const Colors_1 = require("../Colors");
const Loggings_1 = require("../../Loggings");
function Formatter(messages) {
    let message_csl = "";
    let message_rgt = "";
    /**
     * Transform Colors for Console
     */
    messages.forEach((message) => {
        if (typeof message === "string") {
            const colorTagPattern = /\[([^\]]+)\]\.(\w+)(-b)?/g;
            message_csl += message.replace(colorTagPattern, (_, text, color, bold) => {
                const formattedText = bold ? (0, Colors_1.Colors)("bold", text) : text;
                if (Object.keys(defaults_1.LoggingsColors).includes(color)) {
                    return (0, Colors_1.Colors)(color, formattedText);
                }
                else {
                    return (0, Colors_1.Colors)(Loggings_1.Loggings._default_configurations.color_fallback, formattedText);
                }
            });
        }
        else if (typeof message === "number") {
            message_csl += ` ${(0, Colors_1.Colors)("blue", message)}`;
        }
        else if (typeof message === "boolean") {
            message_csl += ` ${message ? (0, Colors_1.Colors)("blue", "true") : (0, Colors_1.Colors)("red", "false")}`;
        }
        else if (typeof message === "object") {
            message_csl += ` ${(0, Colors_1.Colors)("green", JSON.stringify(message))}`;
        }
        else {
            message_csl += ` ${message}`;
        }
    });
    /**
     * Transform Colors for Registration file
     */
    messages.forEach((message) => {
        if (typeof message === "string") {
            const colorTagPattern = /\[([^\]]+)\]\.(\w+)(-b)?/g;
            const LoggingsTxT = message.replace(colorTagPattern, (_, text) => {
                return `"${text}"`;
            });
            const regexColors = /\x1B[[(?);]{0,2}(;?\d)*./g;
            const messageWithoutColors = LoggingsTxT.replace(regexColors, '');
            const regexQuotes = /"(\d{1,})".*?"(\d{1,})"/g;
            const adjustedMessage = messageWithoutColors.replace(regexQuotes, (_, num1, num2) => {
                return `"${num1}"${num2}"`;
            });
            message_rgt += adjustedMessage;
        }
        else if (typeof message === "number") {
            message_rgt += ` ${message.toString()}`;
        }
        else if (typeof message === "boolean") {
            message_rgt += ` ${message.toString()}`;
        }
        else if (typeof message === "object") {
            message_rgt += ` "${JSON.stringify(message)}"`;
        }
        else {
            message_rgt += ` "${message}"`;
        }
    });
    return {
        message_csl,
        message_rgt
    };
}
exports.Formatter = Formatter;
