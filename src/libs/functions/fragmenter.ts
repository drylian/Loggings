/**
 * Fragments a text into parts based on a specific pattern, allowing
 * for the identification of keys and values that can be formatted in bold.
 *
 * @param {string} text - The text to be fragmented, containing patterns in the format [[value].key-b].
 * @param {string} [format="<*>"] - The output format that surrounds the extracted keys.
 *                                   The '*' character will be replaced by the found key.
 * @returns {{ text: string; frags: { key: string; value: string; bold: boolean }[] }}
 * - An object containing the formatted text and an array of fragments.
 *
 * @example
 * const result = Fragmenter("Hello [world].world-b", "<*>");
 * console.log(result);
 * // Expected output:
 * // {
 * //   text: 'Hello <world>',
 * //   frags: [
 * //     { key: 'world', value: 'world', bold: true },
 * //   ]
 * // }
 */
export function Fragmenter(
    text: string,
    format: string = "<*>",
): { text: string; frags: { key: string; value: string; bold: boolean }[] } {
    const [left, right] = format.split("*");
    const frags: { key: string; value: string; bold: boolean }[] = [];
    // deno-lint-ignore no-control-regex
    const pattern = /\[([^\]]+)\]\.(\w+)(-b)?/g;
    let result = text;
    let parts = result.split(" ");
    let match;

    for (const part of parts) {
        while ((match = pattern.exec(part))) {
            let value = match[1];
            const key = match[2];
            const bold = match[3] === "-b";

            const startIndex = value.indexOf("[");
            const endIndex = value.indexOf("]");
            if (startIndex >= 0) {
                value = value.slice(startIndex + 1);
            }
            if (endIndex >= 0) {
                value = value.slice(0, endIndex);
            }
            frags.push({ key, value, bold });
            result = result.replace(
                match[0],
                `${startIndex >= 0 ? "[" : ""}${left}${key}${right}${
                    endIndex >= 0 ? "]" : ""
                }`,
            );
        }
    }
    return { text: result.trim(), frags };
}
