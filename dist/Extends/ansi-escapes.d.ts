/// <reference types="node" />
export declare const cursorTo: (x: number, y?: number) => string;
export declare const cursorMove: (x: number, y?: number) => string;
export declare const cursorUp: (count?: number) => string;
export declare const cursorDown: (count?: number) => string;
export declare const cursorForward: (count?: number) => string;
export declare const cursorBackward: (count?: number) => string;
export declare const cursorLeft: string;
export declare const cursorSavePosition: string;
export declare const cursorRestorePosition: string;
export declare const cursorGetPosition: string;
export declare const cursorNextLine: string;
export declare const cursorPrevLine: string;
export declare const cursorHide: string;
export declare const cursorShow: string;
export declare const eraseLines: (count: number) => string;
export declare const eraseEndLine: string;
export declare const eraseStartLine: string;
export declare const eraseLine: string;
export declare const eraseDown: string;
export declare const eraseUp: string;
export declare const eraseScreen: string;
export declare const scrollUp: string;
export declare const scrollDown: string;
export declare const clearScreen = "\u001Bc";
export declare const clearTerminal: string;
export declare const enterAlternativeScreen: string;
export declare const exitAlternativeScreen: string;
export declare const beep = "\u0007";
export declare const link: (text: string, url: string) => string;
export declare const image: (data: Buffer | string, options?: {
    width?: number;
    height?: number;
    preserveAspectRatio?: boolean;
}) => string;
export declare const iTerm: {
    setCwd: (cwd?: string) => string;
    annotation(message: string, options?: {
        isHidden?: boolean;
        length?: number;
        x?: number;
        y?: number;
    }): string;
};
