import { Timer } from "../../functions/timer.ts";
import path from "node:path";
import fs from "node:fs";
import { Formatter } from "../../functions/formatter.ts";
import { console_defaults } from "../console/defaults.ts";
import { register_defaults } from "./defaults.ts";
import { LoggingsPluginData } from "../../class/plugin.ts";

export const DenoLoggingsRegister:LoggingsPluginData<typeof register_defaults & typeof console_defaults> = {
    identify: "LoggingsRegisterDENO",
    defaults: register_defaults as typeof register_defaults & typeof console_defaults,
    onMessage(
        options,
        current_level,
        args,
    ): void {
        options.level = options.register_level ? options.register_level :options.level;
        if (options.register && current_level >= options.level) {
            /**
             * Make File path
             */
            let filepath = options.register_locale_file.replace(
                new RegExp("{register_dir}", 'g'),
                options.register_dir,
            );
            filepath = filepath.replace(
                new RegExp("{title}", 'g'),
                options.title,
            );
            filepath = filepath.replace(
                new RegExp("{status}", 'g'),
                current_level,
            );
            const logFileName = Timer(options.register_filename).format
                .replace(
                    new RegExp("{status}", 'g'),
                    current_level,
                )
                .replace(
                    new RegExp("{ext}", 'g'),
                    "log",
                );

            /**
             * Make File message
             */
            let message = options.register_format;
            message = Timer(message).format;
            if (message.includes("{title}")) {
                message = message.replace(
                    new RegExp("{title}", 'g'),
                    options.title,
                );
            }
            if (message.includes("{status}")) {
                message = message.replace(
                    new RegExp("{status}", 'g'),
                    current_level,
                );
            }
            if (message.includes("{message}")) {
                message = message.replace(
                    new RegExp("{message}", 'g'),
                    Formatter(...args)[1],
                );
            }
            const logFilePath = path.join(filepath, logFileName);
            const logFolderPath = path.resolve(path.join(filepath));
            if (!fs.existsSync(logFolderPath)) {
                fs.mkdirSync(logFolderPath, { recursive: true });
            }
            fs.appendFileSync(logFilePath, message + "\n");

            if (options.register_del && options.register_limit > 0) {
                const logFilesPattern = new RegExp(`.log`);
                const logFiles = fs
                    .readdirSync(filepath)
                    .filter((file) => logFilesPattern.test(file))
                    .sort((a, b) => {
                        const aStat = fs.statSync(path.join(filepath, a));
                        const bStat = fs.statSync(path.join(filepath, b));
                        return aStat.mtime.getTime() - bStat.mtime.getTime();
                    });
                const filesToDelete = logFiles.slice(
                    0,
                    logFiles.length - options.register_limit,
                ); // Get the oldest files to delete
                filesToDelete.forEach((file) => {
                    const filePath = path.join(filepath, file);
                    fs.unlinkSync(filePath);
                });
            }
        }
    }
};
