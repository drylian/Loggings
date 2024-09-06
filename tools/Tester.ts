import {
    Bgc,
    LoggingsColors as c,
    Rgb,
} from "../src/libs/functions/pallet.ts";
type LogType = "error" | "info" | "warn" | "debug" | "pass";
function bg(type: LogType) {
    switch (type) {
        case "error":
            return Bgc(255, 0, 0); // FAIL
        case "info":
            return Bgc(0, 0, 255); // PASS
        case "pass":
            return Bgc(0, 255, 0); // PASS
        case "warn":
            return Bgc(255, 255, 0); // WARN
        case "debug":
            return Bgc(255, 0, 255); // DEBUG
        default:
            return "";
    }
}

function log(type: LogType, message: string) {
    const bgColor = bg(type);
    console.log(
        `${c["bold"]}${c["white"]}${bgColor} ${type.toUpperCase()} ${
            c["reset"]
        }: ${message} \x1b[0m`,
    );
}

const logger = {
    log: (...msgs: string[]) => log("info", msgs.join(" ")),
    error: (...msgs: string[]) => log("error", msgs.join(" ")),
    warn: (...msgs: string[]) => log("warn", msgs.join(" ")),
    pass: (...msgs: string[]) => log("pass", msgs.join(" ")),
    debug: (...msgs: string[]) => log("debug", msgs.join(" ")),
};

interface TestConstructor<Defs> {
    name: string;
    desc: string;
    def: Defs;
    fn: (def: Defs) => unknown;
}

/**
 * Sample Tester
 */
export class Test<Tests> {
    public static readonly all: TestConstructor<unknown>[] = [];
    public static readonly errors: { index: number; error: Error }[] = [];

    constructor(opt: TestConstructor<Tests>) {
        Test.all.push(opt as TestConstructor<unknown>);
    }
    public static async init() {
        logger.log(`Starting tests of Loggings`);
        for await (const [index, test] of Object.entries(Test.all)) {
            logger.log(
                `TESTING: ${c["gold"]}${test.name}${c["reset"]} - ${
                    c["cyan"]
                }${test.desc}${c["reset"]}`,
            );
            try {
                await test.fn(test.def);
                logger.pass(`PASS: ${c["gold"]}${test.name}${c["reset"]}\n`);
            } catch (e) {
                logger.error(`FAIL: ${c["gold"]}${test.name}${c["reset"]}`);
                logger.error(e.message + "\n");
                Test.errors.push({ index: Number(index), error: e });
            }
        }

        if (Test.errors.length > 0) {
            logger.warn(
                `out of ${c["green"]}${Test.all.length}${c["reset"]} tests, ${
                    c["red"]
                }${Test.errors.length}${
                    c["reset"]
                } errors occurred during verification.`,
            );
            for (const error of Test.errors) {
                console.warn(`${c["green"]}Test${c["reset"]} ${c["red"]}${error.index}${c["reset"]} ${c["gold"]}${Test.all[error.index].name}${c["reset"]}:`, error.error);
            }
        } else {
            logger.pass(
                ` ${c["green"]}${Test.all.length}${c["reset"]} - All tests ${
                    c["green"]
                }passed${c["reset"]} without errors.`,
            );
        }
    }
}
