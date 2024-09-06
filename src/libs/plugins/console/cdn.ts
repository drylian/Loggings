import { Formatter } from "../../functions/formatter.ts";
import { Timer } from "../../functions/timer.ts";
import { Colors } from "../../functions/colors.ts";
import { console_defaults } from "./defaults.ts";
import { LoggingsPluginData } from "../../class/plugin.ts";

export const CdnLoggingsConsole: LoggingsPluginData<typeof console_defaults> = {
    identify: "LoggingsConsole",
    defaults: console_defaults,

    onMessage(
        options,
        current_level,
        args,
    ): void {
        options.level = options.console_level ? options.console_level :options.level;
        if (options.console && current_level >= options.level) {
            let message_csl =
                Formatter(options.format)[options.disable_colors ? 1 : 0];
            message_csl = Timer(message_csl).format;

            if (message_csl.includes("{title}")) {
                message_csl = message_csl.replace(
                    new RegExp("{title}", "g"),
                    Colors(options.color, options.title),
                );
            }
            if (message_csl.includes("{status}")) {
                message_csl = message_csl.replace(
                    new RegExp("{status}", "g"),
                    Colors(
                        options.status[current_level],
                        Colors("bold", current_level),
                    ),
                );
            }
            if (message_csl.includes("{message}")) {
                message_csl = message_csl.replace(
                    new RegExp("{message}", "g"),
                    Formatter(...args)[0],
                );
            }
            console[current_level.toLowerCase() as "info"](
                message_csl + "\n",
            );
        }
    },
};
