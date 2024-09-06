import { existsSync } from "fs";
import { LoggingsRegister } from "../src/libs/plugins/register/node";
import { Loggings, Timer } from "../src/node";
import { Test } from "../tools/Tester";
import { rm } from "fs/promises";

new Test({
    name: "Registration Plugin make file",
    desc: "Check registration Plugin is making file",
    def: undefined,
    async fn() {
        Loggings.reset();
        Loggings.add(LoggingsRegister);
        const logger = new Loggings();
        logger.log("test");
        const file = Timer(logger.configs.register_filename).format.replace(
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
    def: undefined,
    async fn() {
        const logger = new Loggings();
        const file = Timer(logger.configs.register_filename).format.replace(
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
        Loggings.rem(LoggingsRegister.identify);
    },
});

new Test({
    name: "Registration Plugin delete file",
    desc: "Check registration Plugin is deleting files",
    def: undefined,
    async fn() {
        Loggings.reset();
        Loggings.add(LoggingsRegister);
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
