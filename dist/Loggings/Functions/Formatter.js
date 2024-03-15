"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const defaults_1 = __importStar(require("../defaults"));
const Colors_1 = require("../Colors");
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
                    return (0, Colors_1.Colors)((0, defaults_1.default)().color_fallback, formattedText);
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
