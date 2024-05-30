"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
const Timer_1 = require("./Timer");
const Formatter_1 = require("./Formatter");
const Colors_1 = require("../Colors");
const Loggings_1 = require("../../Loggings");
/**
 * Isolated Console, not register, only uses basics configurations
 * Warning: Console not have {title} argument, is removed in "format"
 * @param title Controller
 * @param color Color
 * @param args LoggingsMessage
 */
function Console(status, color, ...args) {
    let format = Loggings_1.Loggings._default_configurations.format;
    format = (0, Timer_1.Timer)(format).format;
    format = (0, Formatter_1.Formatter)([format]).message_csl;
    if (format.includes("{status}")) {
        format = format.replaceAll("{status}", (0, Colors_1.Colors)(color, status));
    }
    if (format.includes("{title}")) {
        format = format.replaceAll("{title}", "");
    }
    if (format.includes("{message}")) {
        format = format.replaceAll("{message}", (0, Formatter_1.Formatter)(args).message_csl);
    }
    console.info(format);
}
exports.Console = Console;
