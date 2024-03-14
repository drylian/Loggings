export enum Timers {
    year = "year",
    month = "month",
    day = "day",
    hours = "hours",
    minutes = "minutes",
    seconds = "seconds",
    milliseconds = "milliseconds"
};

/**
 * Calc timer format
 * @param uptime Timestamp
 * @param mili enable milliseconds
 * @returns 
 */
export function Uptimer(uptime: number, mili = false) {
	const uptimeInSeconds = uptime;
	const days = Math.floor(uptimeInSeconds / 86400);
	const hours = Math.floor(uptimeInSeconds / 3600) % 24;
	const minutes = Math.floor(uptimeInSeconds / 60) % 60;
	const seconds = Math.floor(uptimeInSeconds) % 60;
	const milliseconds = Math.floor((uptimeInSeconds % 1) * 1000);
	if (mili) {
		return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""}${seconds ? seconds + "." : "0."}${milliseconds > 0 ? milliseconds + "s" : ""}`;
	} else {
		return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${
			minutes > 0 ? minutes + "m " : ""
		}${seconds > 0 ? seconds + "s " : "0s"}`;
	}
}

/**
 * Put time in Args {day} | {month} | {year} | {hours} | {minutes}| {seconds} | {milliseconds}
 * @param format 
 * @returns 
 */
export function Timer(format: string) {
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
            const key = time as keyof typeof Timers;
            format = format.replaceAll(`{${Timers[key]}}`, timer[Timers[key]]);
        }
    }
    return { format, timer };
}
