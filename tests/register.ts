import { existsSync } from "node:fs";
import { RegisterPlugin } from "../src/libs/plugins/register.ts";
import { Loggings, timer } from "../src/loggings.ts";
import { Test } from "../tools/Tester.ts";
import { rm } from "node:fs/promises";

new Test({
    name: "Registration Plugin make file",
    desc: "Check registration Plugin is making file",
    async fn() {
        Loggings.config({
            plugins:[RegisterPlugin]
        })
        const logger = new Loggings({
            
        });

        logger.log("test");
        const file = timer(logger.allconfigs.register_filename!).format.replace(
            "{ext}",
            "log",
        );
        if (
            !existsSync(
                `./logs/${file}`,
            )
        ) {
            throw new Error(
                `Test failed. Expected maked file ${file} in path ./logs but not found`,
            );
        }
        await rm("./logs", { recursive: true });
    },
});

new Test({
    name: "Registration Plugin test",
    desc: "Check registration Plugin",
    async fn() {
        const logger = new Loggings();
        const file = timer(logger.allconfigs.register_filename!).format.replace(
            "{ext}",
            "log",
        );
        logger.config({
            register_dir: "./logs_test",
        });
        logger.log("test");
        if (
            !existsSync(
                `./logs_test/${file}`,
            )
        ) {
            throw new Error(
                `Test failed. Expected maked file ${file} in path ./logs_test but not found`,
            );
        }
        await rm("./logs_test", { recursive: true });
        logger.config({
            register_level: "warn",
        });
        logger.log("test");
        if (
            existsSync(
                `./logs_test/${file}`,
            )
        ) {
            throw new Error(
                `Test failed. Expected not maked file ${file} in path ./logs_test but maked`,
            );
        }
        logger.config({
            register_dir: "./logs",
        });
        logger.warn("test");
        console.log("aaa"+logger.plugins)

        if (
            !existsSync(
                `./logs/${file}`,
            )
        ) {
            throw new Error(
                `Test failed. Expected maked file ${file} in path ./logs but not found`,
            );
        }
        await rm("./logs", { recursive: true });
    },
});

new Test({
    name: "Registration Plugin delete file",
    desc: "Check registration Plugin is deleting files",
    async fn() {
        const logger = new Loggings();
        logger.config({
            register_limit: 1,
        });
        logger.config({
            register_filename: "1.{ext}",
        });
        logger.log("test");
        logger.config({
            register_filename: "2.{ext}",
        });
        logger.log("test");
        if (
            existsSync(
                `./logs/1.log`,
            )
        ) {
            throw new Error(
                `Test failed. Expected deleted file 1.log in path ./logs but not deleted`,
            );
        }
        await rm("./logs", { recursive: true });
    },
});
