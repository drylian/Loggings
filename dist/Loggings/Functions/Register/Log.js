"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingsRegisterLogFile = exports.LoggingsRegisterLog = void 0;
const path_1 = __importDefault(require("path"));
const Formatter_1 = require("../Formatter");
const Timer_1 = require("../Timer");
const fs_1 = __importDefault(require("fs"));
/**
 * Register Log type
 * @param options
 * @param args
 */
function LoggingsRegisterLog(options, args) {
    let message_rgt = options.register_format;
    message_rgt = (0, Timer_1.Timer)(message_rgt).format;
    if (message_rgt.includes("{title}")) {
        message_rgt = message_rgt.replaceAll("{title}", options.controller_title);
    }
    if (message_rgt.includes("{status}")) {
        message_rgt = message_rgt.replaceAll("{status}", options.current_level);
    }
    if (message_rgt.includes("{message}")) {
        message_rgt = message_rgt.replaceAll("{message}", (0, Formatter_1.Formatter)(args).message_rgt);
    }
    return message_rgt;
}
exports.LoggingsRegisterLog = LoggingsRegisterLog;
/**
 * Register Log file
 * @param options
 * @param args
 */
function LoggingsRegisterLogFile(options, message) {
    const logFileName = (0, Timer_1.Timer)(options.register_filename).format
        .replaceAll("{status}", options.current_level).replaceAll("{ext}", "log");
    const logFilePath = path_1.default.join(options.register_locale_file, logFileName);
    fs_1.default.appendFileSync(logFilePath, message + "\n");
}
exports.LoggingsRegisterLogFile = LoggingsRegisterLogFile;
