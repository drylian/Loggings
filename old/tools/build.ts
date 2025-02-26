import esbuild from "esbuild";
import fs from "node:fs";
import { dTSPathAliasPlugin } from "esbuild-dts-path-alias";
import { execSync } from "node:child_process";

console.log("Building Esm resources...");
await esbuild.build({
  entryPoints: ["./src/Loggings.ts"],
  outfile: "./loggings.mjs",
  bundle: true,
  minify: true,
  format: "esm",
  target: ["esnext"],
  platform: "node",
});
console.log("Building Types resources...");
execSync("tsc --project ./tsconfig.json");
console.log("Building Cjs resources...");
await esbuild.build({
  entryPoints: ["./src/Loggings.ts"],
  outfile: "./loggings.cjs",
  bundle: true,
  minify: true,
  minifySyntax: true,
  format: "cjs",
  target: ["node14"],
  platform: "node",
  plugins: [
    {
      name: "RenameImport",
      setup(build) {
        build.onLoad({ filter: /\.ts$/ }, async (args) => {
          const text = (await fs.promises.readFile(args.path, "utf8"))
            .replace(/node:console/g, "console")
            .replace(
              "const require = Module.createRequire(import.meta.url);",
              "",
            )
            .replace(/node:util/g, "util");
          return {
            contents: text,
            loader: "ts",
          };
        });
      },
    },
  ],
});

// console.log("Building Cdn mjs resources...");
// await esbuild.build({
//     entryPoints: ["./src/cdn.ts"],
//     outfile: "./cdn.mjs",
//     bundle: true,
//     minify: true,
//     format: "esm",
//     target: ["esnext"],
//     platform: "browser",
//     plugins: [
//         {
//             name: "RemoveImports",
//             setup(build) {
//                 build.onLoad({ filter: /\.ts$/ }, async (args) => {
//                     const text = (await fs.promises.readFile(args.path, "utf8"))
//                         .replace(
//                             /import\s+.*?\s+from\s+['"]node:console['"]/g,
//                             "",
//                         )
//                         .replace(/import\s+.*?\s+from\s+['"]node:util['"]/g, "")
//                         .replace("extends Console {", "{")
//                         .replace(
//                             "super(process.stdin, process.stderr)",
//                             "super()",
//                         );
//                     return {
//                         contents: text,
//                         loader: "ts",
//                     };
//                 });
//             },
//         },
//     ],
// });
// console.log("Building Cdn cjs resources...");
// await esbuild.build({
//     entryPoints: ["./src/cdn.ts"],
//     outfile: "./cdn.cjs",
//     bundle: true,
//     minify: true,
//     format: "cjs",
//     target: ["node14"],
//     platform: "browser",
//     plugins: [
//         {
//             name: "RemoveImports",
//             setup(build) {
//                 build.onLoad({ filter: /\.ts$/ }, async (args) => {
//                     const text = (await fs.promises.readFile(args.path, "utf8"))
//                         .replace(
//                             /import\s+.*?\s+from\s+['"]node:console['"]/g,
//                             "",
//                         )
//                         .replace(/import\s+.*?\s+from\s+['"]node:util['"]/g, "")
//                         .replace("extends Console {", "{")
//                         .replace(
//                             "super(process.stdin, process.stderr)",
//                             "super()",
//                         );
//                     return {
//                         contents: text,
//                         loader: "ts",
//                     };
//                 });
//             },
//         },
//     ],
// });
