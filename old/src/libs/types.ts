/**
 * Type of logs
 */
export type LoggingsMessage = string | boolean | object | number;

export type LoggingsLevel = "info" | "debug" | "warn" | "error" | "trace";

export type EmtpyObj = Record<string | number | symbol, never>;

export type LoggingsLogger = (content: {
    message: string;
    formatted: string;
}, type: LoggingsLevel) => unknown;
