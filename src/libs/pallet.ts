import { rgb } from "./utils";

export const AnsiSpecials = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
    none: "\x1b[22m",
};

export const LoggingsPallet = {
    red: rgb(255, 0, 0)(),
    green: rgb(0, 255, 0)(),
    lime: rgb(128, 255, 128)(),
    blue: rgb(0, 0, 255)(),
    yellow: rgb(255, 255, 0)(),
    cyan: rgb(0, 255, 255)(),
    magenta: rgb(255, 0, 255)(),
    black: rgb(0, 0, 0)(),
    white: rgb(255, 255, 255)(),
    gray: rgb(128, 128, 128)(),
    maroon: rgb(128, 0, 0)(),
    olive: rgb(128, 128, 0)(),
    navy: rgb(0, 0, 128)(),
    purple: rgb(128, 0, 128)(),
    teal: rgb(0, 128, 128)(),
    silver: rgb(192, 192, 192)(),
    indigo: rgb(75, 0, 130)(),
    gold: rgb(255, 215, 0)(),
    pink: rgb(255, 192, 203)(),
    orange: rgb(255, 165, 0)(),
    brown: rgb(165, 42, 42)(),
    peach: rgb(255, 218, 185)(),
    lavender: rgb(230, 230, 250)(),
    coral: rgb(255, 127, 80)(),
    turquoise: rgb(64, 224, 208)(),
    salmon: rgb(250, 128, 114)(),
    olivebrab: rgb(107, 142, 35)(),
    slate: rgb(112, 128, 144)(),
    lsgreen: rgb(32, 178, 170)(),
    dorange: rgb(255, 140, 0)(),
    khaki: rgb(240, 230, 140)(),
    mvred: rgb(199, 21, 133)(),
    dsalmon: rgb(233, 150, 122)(),
    lpink: rgb(255, 182, 193)(),
    dgray: rgb(105, 105, 105)(),
    gainsboro: rgb(220, 220, 220)(),
    ...AnsiSpecials,
};

export function colorpik<Colors extends Record<string, string>>(
    key: keyof Colors,
    text: string,
    colors: Colors,
): string {
    const color = colors[key];
    switch (true) {
        case typeof color == "undefined": {
            return text;
        }
        case color == "none": {
            return text;
        }
        default: {
            return color + text + colors.reset;
        }
    }
}
