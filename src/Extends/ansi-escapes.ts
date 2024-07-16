/**
 * Module ansi-escapes
 * Only add in ts for sup esm and cjs
 */
import process from 'node:process';
import { isBrowser } from './environment';

const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

const isTerminalApp = !isBrowser && process.env.TERM_PROGRAM === 'Apple_Terminal';
const isWindows = !isBrowser && process.platform === 'win32';

const cwdFunction = isBrowser ? () => {
    throw new Error('`process.cwd()` only works in Node.js, not the browser.');
} : process.cwd;

export const cursorTo = (x: number, y?: number): string => {
    if (typeof x !== 'number') {
        throw new TypeError('The `x` argument is required');
    }

    if (typeof y !== 'number') {
        return ESC + (x + 1) + 'G';
    }

    return ESC + (y + 1) + SEP + (x + 1) + 'H';
};

export const cursorMove = (x: number, y?: number): string => {
    if (typeof x !== 'number') {
        throw new TypeError('The `x` argument is required');
    }

    let returnValue = '';

    if (x < 0) {
        returnValue += ESC + (-x) + 'D';
    } else if (x > 0) {
        returnValue += ESC + x + 'C';
    }

    if (y !== undefined) {
        if (y < 0) {
            returnValue += ESC + (-y) + 'A';
        } else if (y > 0) {
            returnValue += ESC + y + 'B';
        }
    }

    return returnValue;
};

export const cursorUp = (count: number = 1): string => ESC + count + 'A';
export const cursorDown = (count: number = 1): string => ESC + count + 'B';
export const cursorForward = (count: number = 1): string => ESC + count + 'C';
export const cursorBackward = (count: number = 1): string => ESC + count + 'D';

export const cursorLeft = ESC + 'G';
export const cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
export const cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
export const cursorGetPosition = ESC + '6n';
export const cursorNextLine = ESC + 'E';
export const cursorPrevLine = ESC + 'F';
export const cursorHide = ESC + '?25l';
export const cursorShow = ESC + '?25h';

export const eraseLines = (count: number): string => {
    let clear = '';

    for (let i = 0; i < count; i++) {
        clear += eraseLine + (i < count - 1 ? cursorUp() : '');
    }

    if (count) {
        clear += cursorLeft;
    }

    return clear;
};

export const eraseEndLine = ESC + 'K';
export const eraseStartLine = ESC + '1K';
export const eraseLine = ESC + '2K';
export const eraseDown = ESC + 'J';
export const eraseUp = ESC + '1J';
export const eraseScreen = ESC + '2J';
export const scrollUp = ESC + 'S';
export const scrollDown = ESC + 'T';

export const clearScreen = '\u001Bc';

export const clearTerminal = isWindows
    ? `${eraseScreen}${ESC}0f`
    : `${eraseScreen}${ESC}3J${ESC}H`;

export const enterAlternativeScreen = ESC + '?1049h';
export const exitAlternativeScreen = ESC + '?1049l';

export const beep = BEL;

export const link = (text: string, url: string): string => [
    OSC,
    '8',
    SEP,
    SEP,
    url,
    BEL,
    text,
    OSC,
    '8',
    SEP,
    SEP,
    BEL,
].join('');

export const image = (data: Buffer | string, options: { width?: number; height?: number; preserveAspectRatio?: boolean } = {}): string => {
    let returnValue = `${OSC}1337;File=inline=1`;

    if (options.width) {
        returnValue += `;width=${options.width}`;
    }

    if (options.height) {
        returnValue += `;height=${options.height}`;
    }

    if (options.preserveAspectRatio === false) {
        returnValue += ';preserveAspectRatio=0';
    }

    return returnValue + ':' + Buffer.from(data).toString('base64') + BEL;
};

export const iTerm = {
    setCwd: (cwd: string = cwdFunction()): string => `${OSC}50;CurrentDir=${cwd}${BEL}`,

    annotation(message: string, options: { isHidden?: boolean; length?: number; x?: number; y?: number } = {}): string {
        let returnValue = `${OSC}1337;`;

        const hasX = options.x !== undefined;
        const hasY = options.y !== undefined;
        if ((hasX || hasY) && !(hasX && hasY && options.length !== undefined)) {
            throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
        }

        message = message.replace(/\|/g, '');

        returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

        if (options.length && options.length > 0) {
            returnValue += (
                hasX
                    ? [message, options.length, options.x, options.y]
                    : [options.length, message]
            ).join('|');
        } else {
            returnValue += message;
        }

        return returnValue + BEL;
    },
};