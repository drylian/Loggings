import esbuild from "esbuild";
import fs from "node:fs";
import path from "node:path";
import dts from "bun-plugin-dts";

const result = await Bun.build({
    entrypoints: ["./src/Loggings.ts"],
    bundle: true,
    minify: true,
    target: "node",
    plugins: [dts()]
});

for (const res of result.outputs) {
    await res.text();
    new Response(res);
    Bun.write(path.join("dist", res.path), res);
}

/**
 * Add global types of loggings d.ts
 */
const file = await fs.promises.readFile("src/types.ts", { encoding:"utf-8"});
const content = file.split("declare")[1];
fs.appendFileSync("dist/Loggings.d.ts", `\ndeclare${content}`);

// Cdn in working...
// const results = await Bun.build({
//     entrypoints: ["./src/Loggings.ts"],
//     // bundle: true,
//     // minify: true,
//     target: "bun",
// });

// for (const res of results.outputs) {
//     await res.text();
//     new Response(res);
//     Bun.write(path.join("dist", "cdn.js"), res);
// }