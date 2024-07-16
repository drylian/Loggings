"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iTerm = exports.image = exports.link = exports.beep = exports.exitAlternativeScreen = exports.enterAlternativeScreen = exports.clearTerminal = exports.clearScreen = exports.scrollDown = exports.scrollUp = exports.eraseScreen = exports.eraseUp = exports.eraseDown = exports.eraseLine = exports.eraseStartLine = exports.eraseEndLine = exports.eraseLines = exports.cursorShow = exports.cursorHide = exports.cursorPrevLine = exports.cursorNextLine = exports.cursorGetPosition = exports.cursorRestorePosition = exports.cursorSavePosition = exports.cursorLeft = exports.cursorBackward = exports.cursorForward = exports.cursorDown = exports.cursorUp = exports.cursorMove = exports.cursorTo = void 0;
/**
 * Module ansi-escapes
 * Only add in ts for sup esm and cjs
 */
const node_process_1 = __importDefault(require("node:process"));
const environment_1 = require("./environment");
const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = !environment_1.isBrowser && node_process_1.default.env.TERM_PROGRAM === 'Apple_Terminal';
const isWindows = !environment_1.isBrowser && node_process_1.default.platform === 'win32';
const cwdFunction = environment_1.isBrowser ? () => {
    throw new Error('`process.cwd()` only works in Node.js, not the browser.');
} : node_process_1.default.cwd;
const cursorTo = (x, y) => {
    if (typeof x !== 'number') {
        throw new TypeError('The `x` argument is required');
    }
    if (typeof y !== 'number') {
        return ESC + (x + 1) + 'G';
    }
    return ESC + (y + 1) + SEP + (x + 1) + 'H';
};
exports.cursorTo = cursorTo;
const cursorMove = (x, y) => {
    if (typeof x !== 'number') {
        throw new TypeError('The `x` argument is required');
    }
    let returnValue = '';
    if (x < 0) {
        returnValue += ESC + (-x) + 'D';
    }
    else if (x > 0) {
        returnValue += ESC + x + 'C';
    }
    if (y !== undefined) {
        if (y < 0) {
            returnValue += ESC + (-y) + 'A';
        }
        else if (y > 0) {
            returnValue += ESC + y + 'B';
        }
    }
    return returnValue;
};
exports.cursorMove = cursorMove;
const cursorUp = (count = 1) => ESC + count + 'A';
exports.cursorUp = cursorUp;
const cursorDown = (count = 1) => ESC + count + 'B';
exports.cursorDown = cursorDown;
const cursorForward = (count = 1) => ESC + count + 'C';
exports.cursorForward = cursorForward;
const cursorBackward = (count = 1) => ESC + count + 'D';
exports.cursorBackward = cursorBackward;
exports.cursorLeft = ESC + 'G';
exports.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
exports.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
exports.cursorGetPosition = ESC + '6n';
exports.cursorNextLine = ESC + 'E';
exports.cursorPrevLine = ESC + 'F';
exports.cursorHide = ESC + '?25l';
exports.cursorShow = ESC + '?25h';
const eraseLines = (count) => {
    let clear = '';
    for (let i = 0; i < count; i++) {
        clear += exports.eraseLine + (i < count - 1 ? (0, exports.cursorUp)() : '');
    }
    if (count) {
        clear += exports.cursorLeft;
    }
    return clear;
};
exports.eraseLines = eraseLines;
exports.eraseEndLine = ESC + 'K';
exports.eraseStartLine = ESC + '1K';
exports.eraseLine = ESC + '2K';
exports.eraseDown = ESC + 'J';
exports.eraseUp = ESC + '1J';
exports.eraseScreen = ESC + '2J';
exports.scrollUp = ESC + 'S';
exports.scrollDown = ESC + 'T';
exports.clearScreen = '\u001Bc';
exports.clearTerminal = isWindows
    ? `${exports.eraseScreen}${ESC}0f`
    : `${exports.eraseScreen}${ESC}3J${ESC}H`;
exports.enterAlternativeScreen = ESC + '?1049h';
exports.exitAlternativeScreen = ESC + '?1049l';
exports.beep = BEL;
const link = (text, url) => [
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
exports.link = link;
const image = (data, options = {}) => {
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
exports.image = image;
exports.iTerm = {
    setCwd: (cwd = cwdFunction()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,
    annotation(message, options = {}) {
        let returnValue = `${OSC}1337;`;
        const hasX = options.x !== undefined;
        const hasY = options.y !== undefined;
        if ((hasX || hasY) && !(hasX && hasY && options.length !== undefined)) {
            throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
        }
        message = message.replace(/\|/g, '');
        returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';
        if (options.length && options.length > 0) {
            returnValue += (hasX
                ? [message, options.length, options.x, options.y]
                : [options.length, message]).join('|');
        }
        else {
            returnValue += message;
        }
        return returnValue + BEL;
    },
};
