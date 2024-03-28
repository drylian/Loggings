"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Loggings_1 = require("../dist/Loggings");
var defaults_1 = require("../dist/Loggings/defaults");
var Colors_1 = require("../dist/Loggings/Colors");
var utils_1 = require("./utils");
var timer = (0, Loggings_1.Timer)("").timer;
/**
 * Check Colors
 */
for (var key in defaults_1.LoggingsColors) {
    if (Object.prototype.hasOwnProperty.call(defaults_1.LoggingsColors, key)) {
        var Expected = defaults_1.LoggingsColors[key] + "test" + defaults_1.LoggingsColors.reset;
        var Value = (0, Colors_1.Colors)(key, "test");
        if (key === "none")
            console.log((0, Loggings_1.Formatter)(["Color Key [".concat(key, "].").concat(key, " - [OK].green-b")]).message_csl);
        else if (!(Expected === Value)) {
            throw new Error("Color Key ".concat(key, " is invalid, the response obtained is different from what was expected"));
        }
        else {
            console.log((0, Loggings_1.Formatter)(["Color Key [".concat(key, "].").concat(key, " - [OK].green-b")]).message_csl);
        }
    }
}
/**
 * Check Formatter
 */
var FormatterTest = (0, Loggings_1.Formatter)(["[Testing].blue [Formatter].red-b", "[Arguments].yellow", 1, { teste: "teste" }]);
var FormatterExpect = {
    message_csl: '\x1B[38;2;1;0;255mTesting\x1B[0m \x1B[38;2;255;0;0m\x1B[1mFormatter\x1B[0m\x1B[0m\x1B[38;2;255;255;0mArguments\x1B[0m \x1B[38;2;1;0;255m1\x1B[0m \x1B[38;2;1;255;0m{"teste":"teste"}\x1B[0m',
    message_rgt: '"Testing" "Formatter""Arguments" 1 "{"teste":"teste"}"'
};
if (!(FormatterTest.message_csl === FormatterExpect.message_csl) || !(FormatterTest.message_rgt === FormatterExpect.message_rgt))
    throw new Error("Formatter is invalid, the response obtained is different from what was expected");
console.log((0, Loggings_1.Formatter)(['Formatter Test - [OK].green-b']).message_csl);
/**
 * Check Register Log
 */
(0, Loggings_1.Controller)(__assign(__assign({}, (0, Loggings_1.LoggingsDefault)()), { console: false, register_type: "log", controller_title: "Testing", register_dir: "./test/logs", current_level: "Info" }), [FormatterExpect.message_rgt]);
var logFileName = "".concat(timer.day, "_").concat(timer.month, "_").concat(timer.year, "_Info.log");
if (fs.existsSync("./test/logs/Testing/Info/" + logFileName)) {
    console.log((0, Loggings_1.Formatter)(['Register Log Test - [OK].green-b']).message_csl);
}
else {
    throw new Error("Register Log is invalid, the response obtained is different from what was expected");
}
/**
 * Check Register Json
 */
(0, Loggings_1.Controller)(__assign(__assign({}, (0, Loggings_1.LoggingsDefault)()), { console: false, register_type: "json", controller_title: "Testing", register_dir: "./test/logs", current_level: "Info" }), [FormatterExpect.message_rgt]);
var JsonFileName = "".concat(timer.day, "_").concat(timer.month, "_").concat(timer.year, "_Info.json");
if (fs.existsSync("./test/logs/Testing/Info/" + JsonFileName)) {
    console.log((0, Loggings_1.Formatter)(['Register Json Test - [OK].green-b']).message_csl);
}
else {
    throw new Error("Register Json is invalid, the response obtained is different from what was expected");
}
/**
 * Check Unlinker
 */
var UnlinkerTest = "".concat(Number(timer.day) + 1, "_").concat(timer.month, "_").concat(timer.year, "_Info.log");
fs.appendFileSync("./test/logs/Testing/Info/" + UnlinkerTest, "Test" + "\n");
(0, Loggings_1.Controller)(__assign(__assign({}, (0, Loggings_1.LoggingsDefault)()), { console: false, controller_title: "Testing", register_dir: "./test/logs", current_level: "Info", register_limit: 2 }), [FormatterExpect.message_rgt]);
if (!fs.existsSync("./test/logs/Testing/Info/" + logFileName)) {
    throw new Error("Unlinker is invalid, the response obtained is different from what was expected");
}
else {
    console.log((0, Loggings_1.Formatter)(['Unlinker Test - [OK].green-b']).message_csl);
}
fs.rmSync("./test/logs", { recursive: true });
/**
 * Check Class
 */
var core = new Loggings_1.Loggings("Testing", "blue", { register_dir: "./test/logs" });
var logPaths = {
    Error: "./test/logs/Testing/Error/",
    Debug: "./test/logs/Testing/Debug/",
    Info: "./test/logs/Testing/Info/",
    Warn: "./test/logs/Testing/Warn/"
};
for (var _i = 0, _a = Object.entries(logPaths); _i < _a.length; _i++) {
    var _b = _a[_i], type = _b[0], path = _b[1];
    var logFilePath = "".concat(path).concat(timer.day, "_").concat(timer.month, "_").concat(timer.year, "_").concat(type, ".log");
    performLogOperation(type, logFilePath);
}
function performLogOperation(type, path) {
    var logMessage = "".concat(type, " Test Visual - [OK].green");
    core[type.toLowerCase()](logMessage);
    if (fs.existsSync(path)) {
        core[type.toLowerCase()]("".concat(type, " Test Register - [OK].green"));
    }
    else {
        throw new Error("Function of class ".concat(type, " is invalid, not have Registred file"));
    }
}
core.txt("test");
if (fs.existsSync("./test/logs/Testing/Logs/" + "".concat(timer.day, "_").concat(timer.month, "_").concat(timer.year, "_Info.log"))) {
    core.info("Txt Test Register - [OK].green");
}
else {
    throw new Error("Function of class \"txt\" is invalid, not have Registred file");
}
/**
 * Check Metadata
 */
var MetaExpected = __assign(__assign({}, (0, Loggings_1.LoggingsDefault)()), { register_dir: "./test/logs", controller_title: "Testing", controller_color: "blue" });
if ((0, utils_1.isEqual)(core.meta, MetaExpected)) {
    core.info("Metadata Test - [OK].green");
}
else {
    throw new Error("Function of class \"meta\" is invalid, the response obtained is different from what was expected");
}
console.log((0, Loggings_1.Formatter)(["ALL Tests as [Approved].green-b"]).message_csl);
