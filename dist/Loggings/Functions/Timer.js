"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.Uptimer = exports.Timers = void 0;
var Timers;
(function (Timers) {
    Timers["year"] = "year";
    Timers["month"] = "month";
    Timers["day"] = "day";
    Timers["hours"] = "hours";
    Timers["minutes"] = "minutes";
    Timers["seconds"] = "seconds";
    Timers["milliseconds"] = "milliseconds";
})(Timers || (exports.Timers = Timers = {}));
;
/**
 * Calc timer format
 * @param uptime Timestamp
 * @param mili enable milliseconds
 * @returns
 */
function Uptimer(uptime, mili = false) {
    const uptimeInSeconds = uptime;
    const days = Math.floor(uptimeInSeconds / 86400);
    const hours = Math.floor(uptimeInSeconds / 3600) % 24;
    const minutes = Math.floor(uptimeInSeconds / 60) % 60;
    const seconds = Math.floor(uptimeInSeconds) % 60;
    const milliseconds = Math.floor((uptimeInSeconds % 1) * 1000);
    if (mili) {
        return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""}${seconds ? seconds + "." : "0."}${milliseconds > 0 ? milliseconds + "s" : ""}`;
    }
    else {
        return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""}${seconds > 0 ? seconds + "s " : "0s"}`;
    }
}
exports.Uptimer = Uptimer;
/**
 * Put time in Args {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
 * @param format
 * @returns
 */
function Timer(format) {
    const now = new Date();
    const timer = {
        timestamp: Date.now(),
        year: String(now.getFullYear()),
        month: String(now.getMonth() + 1).padStart(2, "0"),
        day: String(now.getDate()).padStart(2, "0"),
        hours: String(now.getHours()).padStart(2, "0"),
        minutes: String(now.getMinutes()).padStart(2, "0"),
        seconds: String(now.getSeconds()).padStart(2, "0"),
        milliseconds: String(now.getMilliseconds()).padStart(3, "0")
    };
    for (const time in Timers) {
        if (Object.prototype.hasOwnProperty.call(Timers, time)) {
            const key = time;
            format = format.replaceAll(`{${Timers[key]}}`, timer[Timers[key]]);
        }
    }
    return { format, timer };
}
exports.Timer = Timer;
