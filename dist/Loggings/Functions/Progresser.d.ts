import { ProgressType } from "../types";
/**
 * Class representing a progress bar.
 */
export declare class Progress {
    private total;
    private increment;
    private progress;
    private bar;
    private time;
    private current;
    private options;
    private message;
    /**
     * Constructor of the Progress class.
     * @param options Configuration options for the progress bar.
     */
    constructor(options?: Partial<ProgressType>);
    /**
     * Get the metadata of the progress bar.
     */
    get meta(): {
        current_message: string;
        total: number;
        increment: number;
        progress: number;
        current: number;
        bar: string;
        start_time: number;
        options: ProgressType;
    };
    /**
     * Add a value to the total of the progress bar.
     * @param total The value to be added to the total.
     */
    add(total: number): void;
    /**
     * Remove a value from the total of the progress bar.
     * @param total The value to be removed from the total.
     */
    rem(total: number): void;
    /**
     * Reset the values of the progress bar.
     */
    reset(): void;
    /**
     * Set a message to be displayed alongside the progress bar.
     * @param msg The message to be displayed.
     */
    msg(msg: string): void;
    /**
     * Finish the progress bar.
     * @returns Returns the progress bar data if the current count is less than the total, otherwise returns false.
     */
    end(): false | {
        start: boolean;
    };
    /**
     * Show the progress bar.
     * @returns Returns an object indicating that the progress bar has started.
     */
    show(): {
        start: boolean;
    };
    /**
     * Complete a unit or a specified value in the progression of the progress bar.
     * @param cmt The value to be added to the current count of the progress bar. Default is 1.
     * @returns Returns the updated data of the progress bar.
     */
    cmt(cmt?: number): {
        start: boolean;
    };
}
