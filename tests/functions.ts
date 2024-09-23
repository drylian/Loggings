import { Test } from "../tools/Tester.ts";
import { StaticFormatter } from "../src/libs/functions/formatter.ts";
import { Fragmenter } from "../src/libs/functions/fragmenter.ts";
import { areObjectsEqualDeep } from "./utils.ts";

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
        if (!areObjectsEqualDeep(response, def)) throw new Error(
            `Test failed. Expected ${JSON.stringify(def)} but got ${JSON.stringify(response)
            }`,
        );
    },
});

new Test({
    name: "Formatter Test",
    desc: "should trigger return the value of def",
    def: [
        "[38;2;1;0;255mTesting[0m [38;2;255;0;0m[1mFormatter[0m[0m[38;2;255;255;0mArguments[0m[33m1[39m{ teste: [32m'teste'[39m }#testingtestasd[0m",
        '"Testing" "Formatter""Arguments" 1 "{\n  "teste": "teste"\n}""testasd"',
    ],
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
        for (const key of Object.keys(result)) {
            if (result[Number(key)] !== def[Number(key)]) {
                throw new Error(
                    `Test failed. Expected ${def[Number(key)]} but got ${result[Number(key)]
                    }`,
                );
            }
        }
    },
});