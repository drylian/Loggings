import { LoggingsRegisterConfig } from "./types.ts";

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
