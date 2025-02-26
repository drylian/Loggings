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

    const pattern = /\[([^\]]*)\]\.(\w+)(-b)?/g;

    const result = text.replace(pattern, (_, value, key, boldFlag) => {
        const bold = boldFlag === "-b";

        const clear_value = value.replace(/^\[|\]$/g, '');
        frags.push({ key, value: clear_value, bold });

        const start = value.startsWith('[') ? '[' : '';
        const end = value.endsWith(']') ? ']' : '';

        return `${start}${left}${key}${right}${end}`;
    });

    return { text: result.trim(), frags };
}
