import { Formatter } from "../functions/formatter.ts";
import { Timer } from "../functions/timer.ts";
import type { LoggingsLevel } from "../types.ts";
import path from "node:path";
import fs from "node:fs";
import type { LoggingsPluginData } from "../class/plugin.ts";
import type { console_defaults } from "./console.ts";

export const register_defaults: LoggingsRegisterConfig = {
    register: true,
    register_del: true,
    register_limit: 10,
    register_dir: "./logs",
    register_locale_file: "{register_dir}",
    register_filename: "{day}_{month}_{year}.{ext}",
    register_format:
        "[ {day}/{month}/{year}-{hours}:{minutes}:{seconds} ] [ _.{title}._ ] {message}",
};

export const LoggingsRegister:LoggingsPluginData<typeof register_defaults & typeof console_defaults> = {
  identify: "LoggingsRegister",
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


export type LoggingsRegisterConfig = {
    /**
     * Allows register logs in file, on {register_dir}
     */
    register: boolean;
    /**
     * Allows you to delete the logs, if you exceed the limit configured
     * in "register_limit", if "register_limit" is 0, it will be ignored
     */
    register_del: boolean;
    /** 
     * Loggings Level
     * Register-specific level will be used, if not used
     * will use the global "level"
     */
    register_level?: LoggingsLevel;
    /**
     * Sets how many log files will be needed to start deleting old files,
     * if "register_del" is disabled or the value set is 0,
     * this option will be ignored
     */
    register_limit: number;
    /**
     * Directory where the files will be stored, if "register" is disabled, it will be ignored
     */
    register_dir: string;
    /**
     * Register Format locale file.
     *
     * Suported Args:  {register_dir} | {status} | {title}
     *
     * Default: {register_dir}/{title}/{status}
     */
    register_locale_file: string;
    /**
     * Register File Format locale file.
     *
     * Main Args:  {ext} | {status}
     *
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     *
     * Default:
     * ```js
       const format = "{day}_{month}_{year}_{status}.{ext}";
       ```
     */
    register_filename: string;
    /**
     * Register Format, in registration logs,
     *
     * Main Args:  {status} | {message} | {title}
     *
     * Timer Args: {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
     *
     * Default: [ {day}/{month}/{year} ás {hours}:{minutes}:{seconds} ] [ _.{title}._ ]{message}
     */
    register_format: string;
}
