import path, { join, resolve } from "path";
import { LoggingsController, LoggingsDefaultConfig } from "../types";
import fs, { statSync } from "fs";
import { Console } from "./Console";

/**
 * Unlinker 
 * @param options Loggings Configurations
 * @param pather Location for files 
 */
export function Unlinker(options: LoggingsDefaultConfig & LoggingsController, pather: string) {
    if (options.register_del && options.register_limit > 0) {
        const logFilesPattern = new RegExp(`.*_${options.current_level}.${options.register_type}`);
        const logFiles = fs
            .readdirSync(pather)
            .filter((file) => logFilesPattern.test(file))
            .sort((a, b) => {
                const aStat = statSync(join(pather, a));
                const bStat = statSync(join(pather, b));
                return aStat.mtime.getTime() - bStat.mtime.getTime();
            });
        const filesToDelete = logFiles.slice(0, logFiles.length - options.register_limit); // Get the oldest files to delete
        filesToDelete.forEach((file) => {
            const filePath = path.join(pather, file);
            Console("Loggings", "red", `old register "${options.register_type}" deleted : ["${resolve(process.cwd(), filePath)}"].red`);
            fs.unlinkSync(filePath);
        });
    }
}
