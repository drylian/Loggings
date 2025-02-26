import type { Fragment, FragmentResult } from "../types";

/**
 * Processes text with a configurable prefix for patterns, extracting fragments
 * and formatting nested patterns properly.
 *
 * @param text - The input string containing nested patterns.
 * @param format - The output format with '*' as a placeholder for the key. Default: "<*>".
 * @param prefix - The prefix pattern with '*' as a placeholder for the value. Default: "[*]".
 * @returns An object with the formatted text and extracted fragments.
 */
export function Fragment(text: string, format: string = "<*>", prefix: string = "[*]"): FragmentResult {
    const [left, right] = format.split("*");
    const [start, end] = prefix.split("*");
    const fragments: Fragment[] = [];
    
    const reg_escape = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const pattern = new RegExp(`${reg_escape(start)}([^${reg_escape(start)}${reg_escape(end)}]+)${reg_escape(end)}\\.(\\w+)(-b)?`, 'g');

    const nested = (input: string): string => {
        let output = input;
        let match: RegExpExecArray | null;

        while ((match = pattern.exec(output)) !== null) {
            const [matched, value, key, boldFlag] = match;
            const isBold = boldFlag === "-b";

            fragments.push({
                key,
                value,
                bold: isBold,
            });

            const replacement = `${left}${key}${right}`;
            output = output.replace(matched, replacement);

            pattern.lastIndex = 0;
        }

        return output;
    };

    const formatted = nested(text);

    return {
        text: formatted.trim(),
        frags: fragments,
    };
}