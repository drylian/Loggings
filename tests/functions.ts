import { Test } from "../tools/Tester.ts";
import { StaticFormatter } from "../src/libs/functions/formatter.ts";
import { Fragmenter } from "../src/libs/functions/fragmenter.ts";
import { deepEqual } from "./utils.ts";

new Test({
    name: "Fragmenter test",
    desc: "should trigger return the value of def",
    def: {
        text: 'test <testing>[<testad>[]',
        frags: [
            { key: 'testing', value: 'test', bold: false },
            { key: 'testad', value: 'test', bold: false }
        ]
    },
    fn(def) {
        const response = Fragmenter("test [test].testing[[test].testad[]");
        if (!deepEqual(response, def)) throw new Error(
            `Test failed. Expected ${JSON.stringify(def)} but got ${JSON.stringify(response)
            }`,
        );
    },
});

new Test({
    name: "Formatter Test",
    desc: "should trigger return the value of def",
    def: [[
        "[38;2;1;0;255mTesting[0m [38;2;255;0;0m[1mFormatter[0m[0m[38;2;255;255;0mArguments[0m[33m1[39m{ teste: [32m'teste'[39m }#testingtestasd[0m",
        '"Testing" "Formatter""Arguments" 1 "{\n  "teste": "teste"\n}""testasd"',
    ], ["\u001b[38;2;1;0;255mTesting\u001b[0m \u001b[38;2;255;0;0m\u001b[1mFormatter\u001b[0m\u001b[0m\u001b[38;2;255;255;0mArguments\u001b[0m\u001b[0m\u001b[33m1\u001b[0m{\n  \u001b[0mteste\u001b[2m:\u001b[0m \u001b[0m\u001b[32m\u001b[0m\u001b[32m\"teste\"\u001b[0m\u001b[0m\u001b[0m\u001b[2m,\u001b[0m\n}#testingtestasd\u001b[0m",
        "\"Testing\" \"Formatter\"\"Arguments\" 1 \"{\n  \"teste\": \"teste\"\n}\"\"testasd\""], ["\u001b[38;2;1;0;255mTesting\u001b[0m \u001b[38;2;255;0;0m\u001b[1mFormatter\u001b[0m\u001b[0m\u001b[38;2;255;255;0mArguments\u001b[0m\u001b[33m1\u001b[39m{ teste: \u001b[32m\"teste\"\u001b[39m }#testingtestasd\u001b[0m",
            "\"Testing\" \"Formatter\"\"Arguments\" 1 \"{\n  \"teste\": \"teste\"\n}\"\"testasd\""]],
    fn(def) {
        const result = StaticFormatter(
            { testing_clo: "#testing" },
            "{{{{*}}}}",
            "[Testing].blue [Formatter].red-b",
            "[Arguments].yellow",
            1,
            { teste: "teste" },
            "[testasd].testing_clo",
        );
        // node js Format, bun Format, deno Format
        if (!deepEqual(def[0], result) && !deepEqual(def[1], result) && !deepEqual(def[2], result)) throw new Error(
            `Test failed. Expected ${JSON.stringify(def)} but got ${JSON.stringify(result)
            }`,
        );
    },
});