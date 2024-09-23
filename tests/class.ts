import { Test } from "../tools/Tester.ts";
import { Loggings, type LoggingsPluginData } from "../src/Loggings.ts";
import { LoggingsRegister } from "../src/libs/plugins/register.ts";
import type { EmtpyObj } from "../src/libs/types.ts";
/**
 * Configuration of Loggings
 */
Loggings.reset(); // removes register files;

let statistics_results: string[] = [];
const statistics: LoggingsPluginData<EmtpyObj> = {
    identify: "LoggingsStatistics",
    defaults: {},
    onMessage() {
        statistics_results.push("onMessage");
        return;
    },
    onRemPlugin(_) {
        statistics_results.push("onRemPlugin");
        return;
    },
    onAddPlugin(_) {
        statistics_results.push("onAddPlugin");
        return;
    },
    onCreateInstance(_) {
        statistics_results.push("onCreateInstance");
        return;
    }
};
Loggings.add(statistics); // add statistics;

new Test({
    name: "onMessage Action",
    desc: "Check trigger onMessage event plugin",
    def: undefined,
    fn() {
        new Loggings("testing").log("a");
        if (!statistics_results.includes("onMessage")) {
            throw new Error(`Test failed. Expected call event onMessage but not found`);
        }
    },
});

new Test({
    name: "onRemPlugin Action",
    desc: "Check trigger onRemPlugin event plugin",
    def: undefined,
    fn() {
        Loggings.add(LoggingsRegister);
        Loggings.rem(LoggingsRegister.identify);
        if (!statistics_results.includes("onRemPlugin")) {
            throw new Error(`Test failed. Expected call event onRemPlugin but not found`);
        }
    },
});

new Test({
    name: "onCreateInstance Action",
    desc: "Check trigger onCreateInstance event plugin",
    def: undefined,
    fn() {
        if (!statistics_results.includes("onCreateInstance")) {
            throw new Error(`Test failed. Expected call event onCreateInstance but not found`);
        }
    },
});

new Test({
    name: "onAddPlugin Action",
    desc: "Check trigger onAddPlugin event plugin",
    def: undefined,
    fn() {
        Loggings.add(LoggingsRegister);
        if (!statistics_results.includes("onAddPlugin")) {
            throw new Error(`Test failed. Expected call event onAddPlugin but not found`);
        }
        Loggings.rem(LoggingsRegister.identify);
    },
});

// Repeated test case for demonstration (not necessary, consider removing)
new Test({
    name: "onAddPlugin Action",
    desc: "Check trigger onAddPlugin event plugin",
    def: undefined,
    fn() {
        Loggings.add(LoggingsRegister);
        if (!statistics_results.includes("onAddPlugin")) {
            throw new Error(`Test failed. Expected call event onAddPlugin but not found`);
        }
        Loggings.rem(LoggingsRegister.identify);
        Loggings.rem(statistics.identify); // not necessary;
    },
});

new Test({
    name: "Plugin in instance Loggings",
    def: undefined,
    desc: "Check locale instance plugin",
    fn() {
        Loggings.reset();
        Loggings.add(statistics);
        if (![statistics.identify].includes(new Loggings<typeof statistics>().plugins[0].identify)) {
            throw new Error(`Test failed. Expected call event onAddPlugin but not found`);
        }
        Loggings.rem(LoggingsRegister.identify);
    },
});

// Tests for static values
statistics_results = [];

new Test({
    name: "Static onMessage Action",
    desc: "Check if static method triggers onMessage event",
    def: undefined,
    fn() {
        Loggings.log("testing static log");
        if (!statistics_results.includes("onMessage")) {
            throw new Error(`Test failed. Expected static call event onMessage but not found`);
        }
    },
});

new Test({
    name: "Static onRemPlugin Action",
    desc: "Check if static method triggers onRemPlugin event",
    def: undefined,
    fn() {
        Loggings.add(LoggingsRegister);
        Loggings.rem(LoggingsRegister.identify);
        if (!statistics_results.includes("onRemPlugin")) {
            throw new Error(`Test failed. Expected static call event onRemPlugin but not found`);
        }
    },
});

new Test({
    name: "Static onAddPlugin Action",
    desc: "Check if static method triggers onAddPlugin event",
    def: undefined,
    fn() {
        Loggings.add(LoggingsRegister);
        if (!statistics_results.includes("onAddPlugin")) {
            throw new Error(`Test failed. Expected static call event onAddPlugin but not found`);
        }
        Loggings.rem(LoggingsRegister.identify);
    },
});

new Test({
    name: "Static onCreateInstance Action",
    desc: "Check if static method triggers onCreateInstance event",
    def: undefined,
    fn() {
        if (!statistics_results.includes("onCreateInstance")) {
            throw new Error(`Test failed. Expected static call event onCreateInstance but not found`);
        }
    },
});
