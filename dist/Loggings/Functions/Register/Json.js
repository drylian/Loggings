"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingsRegisterJsonFile = exports.LoggingsRegisterJson = void 0;
const path_1 = __importDefault(require("path"));
const Formatter_1 = require("../Formatter");
const Timer_1 = require("../Timer");
const fs_1 = __importDefault(require("fs"));
/**
 * Register Log type
 * @param options
 * @param args
 */
function LoggingsRegisterJson(options, args) {
    let message_rgt = {
        title: options.controller_title,
        level: options.current_level,
        message: (0, Formatter_1.Formatter)(args).message_rgt,
        time: Date.now()
    };
    return message_rgt;
}
exports.LoggingsRegisterJson = LoggingsRegisterJson;
/**
 * Register Json file
 * @param options
 * @param args
 */
function LoggingsRegisterJsonFile(options, message) {
    const timer = (0, Timer_1.Timer)("").timer;
    const JsonFileName = `${timer.day}_${timer.month}_${timer.year}_${options.current_level}.json`;
    const JsonFilePath = path_1.default.join(options.register_locale_file, JsonFileName);
    let data = {};
    if (fs_1.default.existsSync(JsonFilePath))
        data = JSON.parse(fs_1.default.readFileSync(JsonFilePath, "utf-8"));
    const logCounter = Object.keys(data).length + 1;
    data[`case_${logCounter}`] = [message];
    fs_1.default.writeFileSync(JsonFilePath, JSON.stringify(data, null, 2), { flag: "w" });
}
exports.LoggingsRegisterJsonFile = LoggingsRegisterJsonFile;
