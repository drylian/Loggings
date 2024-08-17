import * as fs from "fs";
import {
    Controller,
    Formatter,
    Loggings,
    LoggingsDefault,
    Progress,
    Timer,
} from "../src/Loggings";
import { LoggingsColors, LoggingsConfig } from "../src/Loggings";
import { Colors } from "../src/Loggings/Colors";
import { isEqual } from "./utils";

const timer = Timer("").timer;

/**
 * Check Colors
 */
for (const key in LoggingsColors) {
    if (Object.prototype.hasOwnProperty.call(LoggingsColors, key)) {
        const Expected = LoggingsColors[key] + "test" + LoggingsColors.reset;
        const Value = Colors(key as keyof typeof LoggingsColors, "test");
        if (key === "none") {
            console.log(
                Formatter([`Color Key [${key}].${key} - [OK].green-b`])
                    .message_csl,
            );
        } else if (!(Expected === Value)) {
            throw new Error(
                `Color Key ${key} is invalid, the response obtained is different from what was expected`,
            );
        } else {
            console.log(
                Formatter([`Color Key [${key}].${key} - [OK].green-b`])
                    .message_csl,
            );
        }
    }
}

/**
 * Check Formatter
 */
const FormatterTest = Formatter([
    "[Testing].blue [Formatter].red-b",
    "[Arguments].yellow",
    1,
    { teste: "teste" },
]);
const FormatterExpect = {
    message_csl:
        "\x1B[38;2;1;0;255mTesting\x1B[0m \x1B[38;2;255;0;0m\x1B[1mFormatter\x1B[0m\x1B[0m\x1B[38;2;255;255;0mArguments\x1B[0m\x1B[33m1\x1B[39m{ teste: \x1B[32m'teste'\x1B[39m }",
    message_rgt:
        '"Testing" "Formatter""Arguments" 1 "{\n  "teste": "teste"\n}"',
};
if (
    !(FormatterTest.message_csl === FormatterExpect.message_csl) ||
    !(FormatterTest.message_rgt === FormatterExpect.message_rgt)
) {
    throw new Error(
        "Formatter is invalid, the response obtained is different from what was expected",
    );
}
console.log(Formatter(["Formatter Test - [OK].green-b"]).message_csl);

/**
 * Check Register Log
 */
Controller({
    ...LoggingsDefault(),
    console: false,
    register_type: "log",
    controller_title: "Testing",
    register_dir: "./test/logs",
    current_level: "Info",
}, [FormatterExpect.message_rgt]);
const logFileName = `${timer.day}_${timer.month}_${timer.year}_Info.log`;
if (fs.existsSync("./test/logs/Testing/Info/" + logFileName)) {
    console.log(Formatter(["Register Log Test - [OK].green-b"]).message_csl);
} else {
    throw new Error(
        "Register Log is invalid, the response obtained is different from what was expected",
    );
}

/**
 * Check Register Json
 */
Controller({
    ...LoggingsDefault(),
    console: false,
    register_type: "json",
    controller_title: "Testing",
    register_dir: "./test/logs",
    current_level: "Info",
}, [FormatterExpect.message_rgt]);
const JsonFileName = `${timer.day}_${timer.month}_${timer.year}_Info.json`;
if (fs.existsSync("./test/logs/Testing/Info/" + JsonFileName)) {
    console.log(Formatter(["Register Json Test - [OK].green-b"]).message_csl);
} else {
    throw new Error(
        "Register Json is invalid, the response obtained is different from what was expected",
    );
}

/**
 * Check Unlinker
 */
const UnlinkerTest = `${
    Number(timer.day) + 1
}_${timer.month}_${timer.year}_Info.log`;
fs.appendFileSync("./test/logs/Testing/Info/" + UnlinkerTest, "Test" + "\n");
Controller({
    ...LoggingsDefault(),
    console: false,
    controller_title: "Testing",
    register_dir: "./test/logs",
    current_level: "Info",
    register_limit: 2,
}, [FormatterExpect.message_rgt]);
if (!fs.existsSync("./test/logs/Testing/Info/" + logFileName)) {
    throw new Error(
        "Unlinker is invalid, the response obtained is different from what was expected",
    );
} else {
    console.log(Formatter(["Unlinker Test - [OK].green-b"]).message_csl);
}
fs.rmSync("./test/logs", { recursive: true });

/**
 * Check Class
 */
const core = new Loggings("Testing", "blue", { register_dir: "./test/logs" });
const logPaths: { [key: string]: string } = {
    Error: "./test/logs/Testing/Error/",
    Debug: "./test/logs/Testing/Debug/",
    Info: "./test/logs/Testing/Info/",
    Warn: "./test/logs/Testing/Warn/",
};
for (const [type, path] of Object.entries(logPaths)) {
    const logFilePath =
        `${path}${timer.day}_${timer.month}_${timer.year}_${type}.log`;
    performLogOperation(type, logFilePath);
}
function performLogOperation(type: string, path: string) {
    const logMessage = `${type} Test Visual - [OK].green`;
    core[type.toLowerCase()](logMessage);

    if (fs.existsSync(path)) {
        core[type.toLowerCase()](`${type} Test Register - [OK].green`);
    } else {
        throw new Error(
            `Function of class ${type} is invalid, not have Registred file`,
        );
    }
}
core.txt("test");
if (
    fs.existsSync(
        "./test/logs/Testing/Logs/" +
            `${timer.day}_${timer.month}_${timer.year}_Info.log`,
    )
) {
    core.info(`Txt Test Register - [OK].green`);
} else {
    throw new Error(
        `Function of class "txt" is invalid, not have Registred file`,
    );
}

/**
 * Check Metadata
 */
const MetaExpected = {
    ...LoggingsDefault(),
    register_dir: "./test/logs",
    controller_title: "Testing",
    controller_color: "blue",
};
if (isEqual(core.meta, MetaExpected)) {
    core.info(`Metadata Test - [OK].green`);
} else {
    throw new Error(
        `Function of class "meta" is invalid, the response obtained is different from what was expected`,
    );
}

/**
 * Checker config update of instance
 */
const logger = new Loggings("Testing", "blue", {
    level: "Debug",
    register: false,
});
const options = logger.options;
logger.config({ level: "Info" });
if (JSON.stringify(options) === JSON.stringify(logger.options)) {
    throw new Error(
        `Function of class "config" is invalid, the response obtained is different from what was expected`,
    );
} else {
    console.log(Formatter(["Config class updated - [OK].green"]).message_csl);
}

/**
 * Check update Global config of loggings
 */
fs.rmSync("./test/logs", { recursive: true });
LoggingsConfig({
    register: false,
});
core.txt("test");
if (
    fs.existsSync(
        "./test/logs/Testing/Logs/" +
            `${timer.day}_${timer.month}_${timer.year}_Info.log`,
    )
) {
    throw new Error(
        `LogginsConfig Global update is invalid, not have update instance`,
    );
} else {
    console.log(Formatter(["LogginsConfig Global - [OK].green"]).message_csl);
}

LoggingsConfig({
    remove_colors: __filename.endsWith(".js") ? true : false,
});
core.info("This is Exemple");
let _logger = false;
LoggingsConfig({
    register: false,
    logger(contents, type) {
        if (type === "error" || type === "warn") {
            process.stderr.write(`${contents.formatted}\n`);
        } else {
            _logger = true;
            process.stdout.write(`${contents.formatted}\n`);
        }
    },
});
core.info("This is Exemple with modded logger");
if (!_logger) {
    throw new Error(
        `LogginsConfig Global update is invalid, not have update instance`,
    );
}

let testcmt, testadd, testrem, testend, testshow, testreset;
const progress = new Progress({
    progress_onAdd() {
        testadd = true;
    },
    progress_onRem() {
        testrem = true;
    },
    progress_onEnd() {
        testend = true;
    },
    progress_onCmt() {
        testcmt = true;
    },
    progress_onShow() {
        testshow = true;
    },
    progress_onReset() {
        testreset = true;
    },
});

progress.add(10);
if (!testadd) throw new Error("Function add of Progress not working");

progress.rem(1);
if (!testrem) throw new Error("Function rem of Progress not working");

progress.cmt();
if (!testcmt) throw new Error("Function cmt of Progress not working");

progress.show();
if (!testshow) throw new Error("Function show of Progress not working");

progress.reset();
if (!testreset) throw new Error("Function reset of Progress not working");

progress.end();
if (!testend) throw new Error("Function end of Progress not working");

Loggings.useConsole(core);
console.log("ALL Tests as [Approved].green-b");
