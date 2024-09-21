import esbuild from "esbuild";
import fs from "node:fs";
import { dTSPathAliasPlugin } from "esbuild-dts-path-alias";

console.log("Building Esm resources...");
await esbuild.build({
    entryPoints: ["./src/node.ts"],
    outfile: "./node.mjs",
    bundle: true,
    minify: true,
    format: "esm",
    target: ["esnext"],
    platform: "node",
});

console.log("Building Cjs resources...");
await esbuild.build({
    entryPoints: ["./src/node.ts"],
    outfile: "./node.cjs",
    bundle: true,
    minify: true,
    minifySyntax: true,
    format: "cjs",
    target: ["node14"],
    platform: "node",
    plugins: [dTSPathAliasPlugin({
        tsconfigPath: "./tsconfig.json",
        outputPath: "./types",
        debug: true,
    }), {
            name: "RemoveImports",
            setup(build) {
                build.onLoad({ filter: /\.ts$/ }, async (args) => {
                    const text = (await fs.promises.readFile(args.path, "utf8"))
                        .replace(
                            /node:console/g,
                            "console",
                        )
                        .replace(
                            /node:util/g,
                            "util",
                        )
                    return {
                        contents: text,
                        loader: "ts",
                    };
                });
            },
        },],
});

console.log("Building Cdn resources...");
await esbuild.build({
    entryPoints: ["./src/cdn.ts"],
    outfile: "./cdn.js",
    bundle: true,
    minify: true,
    format: "esm",
    target: ["esnext"],
    platform: "browser",
    plugins: [
        {
            name: "RemoveImports",
            setup(build) {
                build.onLoad({ filter: /\.ts$/ }, async (args) => {
                    const text = (await fs.promises.readFile(args.path, "utf8"))
                        .replace(
                            /import\s+.*?\s+from\s+['"]node:console['"]/g,
                            "",
                        )
                        .replace(/import\s+.*?\s+from\s+['"]node:util['"]/g, "")
                        .replace("extends Console {", "{")
                        .replace(
                            "super(process.stdin, process.stderr)",
                            "super()",
                        );
                    return {
                        contents: text,
                        loader: "ts",
                    };
                });
            },
        },
    ],
});
