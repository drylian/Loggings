"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const Formatter_1 = require("./Functions/Formatter");
const Timer_1 = require("./Functions/Timer");
const Register_1 = require("./Functions/Register");
const Json_1 = require("./Functions/Register/Json");
const Log_1 = require("./Functions/Register/Log");
const Colors_1 = require("./Colors");
const Loggings_1 = require("../Loggings");
/**
 * Main Controller for Loggings
 * @param isolated LoggingsConfigurations
 * @param args LoggingsMessageArgs
 */
function Controller(isolated, args) {
    /**
     * Merge default options in Partial options
     */
    const options = {
        ...Loggings_1.Loggings._default_configurations,
        ...isolated
    };
    /**
     * Check console is allowed
     */
    if (options.console && options.current_level >= options.level) {
        let message_csl = (0, Formatter_1.Formatter)([options.format])[options.remove_colors ? "message_rgt" : "message_csl"];
        message_csl = (0, Timer_1.Timer)(message_csl).format;
        if (!options.remove_colors) {
            if (message_csl.includes("{title}")) {
                message_csl = message_csl.replaceAll("{title}", (0, Colors_1.Colors)(options.controller_color, options.controller_title));
            }
            if (message_csl.includes("{status}")) {
                message_csl = message_csl.replaceAll("{status}", (0, Colors_1.Colors)(options.status_colors[options.current_level].bg, (0, Colors_1.Colors)(options.status_colors[options.current_level].color, (0, Colors_1.Colors)("bold", options.current_level))));
            }
            if (message_csl.includes("{message}")) {
                message_csl = message_csl.replaceAll("{message}", (0, Formatter_1.Formatter)(args).message_csl);
            }
        }
        else {
            if (message_csl.includes("{title}")) {
                message_csl = message_csl.replaceAll("{title}", options.controller_title);
            }
            if (message_csl.includes("{status}")) {
                message_csl = message_csl.replaceAll("{status}", options.current_level);
            }
            if (message_csl.includes("{message}")) {
                message_csl = message_csl.replaceAll("{message}", (0, Formatter_1.Formatter)(args).message_rgt);
            }
        }
        options.logger({ formated: message_csl, messages: args }, options.current_level.toLowerCase());
    }
    /**
     * Check register is allowed
     */
    if (options.register && options.current_level >= options.level) {
        let message_rgt;
        options.register_locale_file = options.register_locale_file.replaceAll("{register_dir}", options.register_dir);
        options.register_locale_file = options.register_locale_file.replaceAll("{title}", options.controller_title);
        if (options.register_text) {
            options.register_locale_file = options.register_locale_file.replaceAll("{status}", "Logs");
        }
        else {
            options.register_locale_file = options.register_locale_file.replaceAll("{status}", options.current_level);
        }
        if (options.register_type === "log") {
            message_rgt = (0, Log_1.LoggingsRegisterLog)(options, args);
        }
        else if (options.register_type === "json") {
            message_rgt = (0, Json_1.LoggingsRegisterJson)(options, args);
        }
        else {
            // default case register_type have invalid method
            message_rgt = (0, Log_1.LoggingsRegisterLog)(options, args);
        }
        (0, Register_1.Register)(options, message_rgt);
    }
}
exports.Controller = Controller;
