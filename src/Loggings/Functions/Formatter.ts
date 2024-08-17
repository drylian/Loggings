import { LoggingsMessage } from "../types";
import { LoggingsColors } from "../defaults";
import { Colors } from "../Colors";
import { Loggings } from "../../Loggings";
import { inspect } from "node:util";

const inspector = (msg: LoggingsMessage) => {
    return inspect(msg, { depth: null, colors: true });
};

export function Formatter(messages: LoggingsMessage[]) {
    let message_csl: string = "";
    let message_rgt: string = "";

    /**
     * Transform Colors for Console
     */
    messages.forEach((message) => {
        if (typeof message === "string") {
            const colorTagPattern = /\[([^\]]+)\]\.(\w+)(-b)?/g;
            message_csl += message.replace(
                colorTagPattern,
                (_, text, color, bold) => {
                    const formattedText = bold ? Colors("bold", text) : text;
                    if (Object.keys(LoggingsColors).includes(color)) {
                        return Colors(color, formattedText);
                    } else {
                        return Colors(
                            Loggings._default_configurations.color_fallback,
                            formattedText,
                        );
                    }
                },
            );
        } else {
            message_csl += inspector(message);
        }
    });

    /**
     * Transform Colors for Registration file
     */
    messages.forEach((message) => {
        if (typeof message === "string") {
            const colorTagPattern = /\[([^\]]+)\]\.(\w+)(-b)?/g;
            const LoggingsTxT = message.replace(colorTagPattern, (_, text) => {
                return `"${text}"`;
            });
            const regexColors = /\x1B[[(?);]{0,2}(;?\d)*./g;
            const messageWithoutColors = LoggingsTxT.replace(regexColors, "");
            const regexQuotes = /"(\d{1,})".*?"(\d{1,})"/g;
            const adjustedMessage = messageWithoutColors.replace(
                regexQuotes,
                (_, num1, num2) => {
                    return `"${num1}"${num2}"`;
                },
            );
            message_rgt += adjustedMessage;
        } else if (typeof message === "number") {
            message_rgt += ` ${message.toString()}`;
        } else if (typeof message === "boolean") {
            message_rgt += ` ${message.toString()}`;
        } else if (typeof message === "object") {
            message_rgt += ` "${JSON.stringify(message, null, 2)}"`;
        } else {
            message_rgt += ` "${message}"`;
        }
    });
    return {
        message_csl,
        message_rgt,
    };
}
