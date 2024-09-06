/**
 * Background RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns
 */
export const Bgc = (r: number, g: number, b: number) => {
    const colors = [r, g, b];
    for (const key of colors) {
        const color = colors[key];
        if (color > 255) colors[key] = 255;
        else if (color < 1) colors[key] = 1;
    }
    return `\x1b[48;2;${colors[0]};${colors[1]};${colors[2]}m`;
};
/**
 * Text RGB Color
 * @param r Red color (1 ~ 255)
 * @param g Green color (1 ~ 255)
 * @param b Blue color (1 ~ 255)
 * @returns
 */
export const Rgb = (r: number, g: number, b: number) => {
    const colors = [r, g, b];
    for (const key of colors) {
        const color = colors[key];
        if (color > 255) colors[key] = 255;
        else if (color < 1) colors[key] = 1;
    }
    return `\x1b[38;2;${colors[0]};${colors[1]};${colors[2]}m`;
};

const ColorPallet = {
    red: Rgb(255, 0, 0),
    green: Rgb(0, 255, 0),
    lime: Rgb(128, 255, 128),
    blue: Rgb(0, 0, 255),
    yellow: Rgb(255, 255, 0),
    cyan: Rgb(0, 255, 255),
    magenta: Rgb(255, 0, 255),
    black: Rgb(0, 0, 0),
    white: Rgb(255, 255, 255),
    gray: Rgb(128, 128, 128),
    maroon: Rgb(128, 0, 0),
    olive: Rgb(128, 128, 0),
    navy: Rgb(0, 0, 128),
    purple: Rgb(128, 0, 128),
    teal: Rgb(0, 128, 128),
    silver: Rgb(192, 192, 192),
    indigo: Rgb(75, 0, 130),
    gold: Rgb(255, 215, 0),
    pink: Rgb(255, 192, 203),
    orange: Rgb(255, 165, 0),
    brown: Rgb(165, 42, 42),
    peach: Rgb(255, 218, 185),
    lavender: Rgb(230, 230, 250),
    coral: Rgb(255, 127, 80),
    turquoise: Rgb(64, 224, 208),
    salmon: Rgb(250, 128, 114),
    olivebrab: Rgb(107, 142, 35),
    slate: Rgb(112, 128, 144),
    lsgreen: Rgb(32, 178, 170),
    dorange: Rgb(255, 140, 0),
    khaki: Rgb(240, 230, 140),
    mvred: Rgb(199, 21, 133),
    dsalmon: Rgb(233, 150, 122),
    lpink: Rgb(255, 182, 193),
    dgray: Rgb(105, 105, 105),
    gainsboro: Rgb(220, 220, 220),
    // N Colors
    nred: Rgb(255, 45, 0),
    ngreen: Rgb(57, 255, 20),
    nblue: Rgb(0, 0, 255),
    nyellow: Rgb(255, 255, 51),
    ncyan: Rgb(0, 255, 255),
    nmagenta: Rgb(255, 0, 255),
    npink: Rgb(255, 20, 147),
    norange: Rgb(255, 165, 0),
    npurple: Rgb(128, 0, 255),
    nturquoise: Rgb(0, 255, 255),
    nviolet: Rgb(238, 130, 238),
    ncoral: Rgb(255, 127, 80),
} as const;

/**
 * Declared Colors
 */
export const LoggingsColors = {
    inverse: "\x1b[7m",
    none: "none",
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    def: "\x1b[49m",
    normal: "\x1b[22m",
    blink: "\x1b[5m",
    nblink: "\x1b[25m",
    hidden: "\x1b[8m", 
    visible: "\x1b[28m", 
    over: "\x1b[53m", 
    nover: "\x1b[55m",
    dtext: "\x1b[2m", 
    italic: "\x1b[3m",
    icolor: "\x1b[7m",
    ncolor: "\x1b[27m",
    strike: "\x1b[9m",
    nstrike: "\x1b[29m",
    under: "\x1b[4m",
    dunder: "\x1b[21m",
    nunder: "\x1b[24m",
    cunder: "\x1b[4:3m",
    dounder: "\x1b[4:4m",
    daunder: "\x1b[4:5m",
    runder: "\x1b[59m",
    ...ColorPallet,
} as const;

