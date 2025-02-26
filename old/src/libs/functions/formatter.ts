import type { LoggingsMessage } from "../types.ts";
import { Colors } from "./colors.ts";
import { LoggingsColors } from "./pallet.ts";
import { Fragmenter } from "./fragmenter.ts";
import { inspector } from "./inspector.ts";

/**
 * Formatter of Colors
 * Returns formatted message with and out colors
 * ```ts
 * const [with_color,out_color] = Formatter("I Am [Green].green!");
 * console.log(with_color,out_color)
 * ```
 */
export function Formatter(...messages: LoggingsMessage[]) {
    return StaticFormatter({},"{{{{*}}}}", ...messages);
}

export function StaticFormatter(
    colors: Record<string, string>,
    format: string,
    ...messages: LoggingsMessage[]
) {
    let message_csl: string = "";
    let message_rgt: string = "";

    /**
     * Transform Colors for Console
     */
    messages.forEach((message) => {
        if (typeof message === "string") {
            const response = Fragmenter(message, format);
            response.frags.forEach(frag => {
                let fragmented = frag.value;
                if(frag.bold) fragmented = Colors("bold", frag.value, colors);
                if (Object.keys(LoggingsColors).includes(frag.key)) {
                    fragmented = Colors(frag.key as keyof typeof LoggingsColors, fragmented, colors);
                }
                response.text = response.text.replace(`${format.split("*")[0]}${frag.key}${format.split("*")[1]}`, fragmented);

            })
            message_csl += response.text;
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
            // deno-lint-ignore no-control-regex
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
    return [message_csl, message_rgt];
}
