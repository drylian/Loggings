"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Progress = void 0;
const Loggings_1 = require("../../Loggings");
const Formatter_1 = require("./Formatter");
const Timer_1 = require("./Timer");
/**
 * Class representing a progress bar.
 */
class Progress {
    total;
    increment;
    progress;
    bar;
    time;
    current;
    options;
    message;
    /**
     * Constructor of the Progress class.
     * @param options Configuration options for the progress bar.
     */
    constructor(options) {
        const data = Loggings_1.Loggings._default_configurations;
        this.options = {
            ...data,
            ...options,
        };
        this.message = "";
        this.total = 0;
        this.increment = 0;
        this.progress = 0;
        this.current = 0;
        this.bar = '';
        this.time = 0;
    }
    /**
     * Get the metadata of the progress bar.
     */
    get meta() {
        return {
            current_message: this.message,
            total: this.total,
            increment: this.increment,
            progress: this.progress,
            current: this.current,
            bar: this.bar,
            start_time: this.time,
            options: this.options,
        };
    }
    /**
     * Add a value to the total of the progress bar.
     * @param total The value to be added to the total.
     */
    add(total) {
        this.total += total;
        if (this.options.progress_onAdd)
            this.options.progress_onAdd(this);
    }
    /**
     * Remove a value from the total of the progress bar.
     * @param total The value to be removed from the total.
     */
    rem(total) {
        this.total = this.total - total;
        this.current = this.current - total;
        if (this.options.progress_onRem)
            this.options.progress_onRem(this);
    }
    /**
     * Reset the values of the progress bar.
     */
    reset() {
        this.message = "";
        this.total = 0;
        this.increment = 0;
        this.progress = 0;
        this.current = 0;
        this.bar = '';
        this.time = 0;
        if (this.options.progress_onReset)
            this.options.progress_onReset(this);
    }
    /**
     * Set a message to be displayed alongside the progress bar.
     * @param msg The message to be displayed.
     */
    msg(msg) {
        this.message = (0, Formatter_1.Formatter)([msg]).message_csl;
    }
    /**
     * Finish the progress bar.
     * @returns Returns the progress bar data if the current count is less than the total, otherwise returns false.
     */
    end() {
        if (this.options.progress_onEnd)
            this.options.progress_onEnd(this);
        if (this.current <= this.total) {
            const data = this.show();
            this.current = this.total;
            if (this.options.progress_show)
                process.stdout.write("\n");
            this.reset();
            return data;
        }
        else {
            this.reset();
            return false;
        }
    }
    /**
     * Show the progress bar.
     * @returns Returns an object indicating that the progress bar has started.
     */
    show() {
        let format = (0, Timer_1.Timer)(this.options.progress_format).format;
        format = (0, Formatter_1.Formatter)([format]).message_csl;
        this.increment = this.total / this.options.progress_size / 100;
        if (this.time === 0)
            this.time = process.uptime();
        this.progress += this.increment;
        format = format.replaceAll("{current}", String(this.options?.progress_fixed ? this.current.toFixed(this.options.progress_fixed) : this.current));
        format = format.replaceAll("{message}", this.message);
        format = format.replaceAll("{total}", String(this.options?.progress_fixed ? this.total.toFixed(this.options.progress_fixed) : this.total));
        format = format.replaceAll("{progress}", String(((this.current / this.total) * 100).toFixed(0)));
        format = format.replaceAll("{progress_time}", String((0, Timer_1.Uptimer)(process.uptime() - this.time, this.options.progress_mili)));
        format = format.replaceAll("{progress_eta}", String((0, Timer_1.Uptimer)(((this.total - this.current) / this.current) * (process.uptime() - this.time), this.options.progress_mili)));
        const calc = Math.floor(this.current / this.total * this.options.progress_size);
        let newBar = this.options.progress_bar.repeat(calc);
        let spaces = "";
        spaces = " ".repeat(Math.floor(this.options.progress_size - calc));
        newBar = newBar + spaces;
        this.bar = newBar;
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        if (this.options.progress_show)
            if (this.bar)
                process.stdout.write(format.replaceAll("{bar}", this.bar));
        if (this.options.progress_onShow)
            this.options.progress_onShow(this);
        return { start: true };
    }
    /**
     * Complete a unit or a specified value in the progression of the progress bar.
     * @param cmt The value to be added to the current count of the progress bar. Default is 1.
     * @returns Returns the updated data of the progress bar.
     */
    cmt(cmt = 1) {
        this.current += cmt;
        if (this.current > this.total)
            this.current = this.total;
        if (this.options.progress_onCmt)
            this.options.progress_onCmt(this);
        return this.show();
    }
}
exports.Progress = Progress;
