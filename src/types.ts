
/**
 * Processes text with a configurable prefix for patterns, extracting fragments and formatting.
 *
 * @param text - The input string containing patterns.
 * @param format - The output format with '*' as a placeholder for the key. Default: "<*>".
 * @param prefix - The prefix pattern with '*' as a placeholder for the value. Default: "[*]".
 * @returns An object with the formatted text and extracted fragments.
 */
export interface Fragment {
    key: string;
    value: string;
    bold: boolean;
}

/**
 * Result of fragment text using Fragmenter of loggings
 */
export interface FragmentResult {
    text: string;
    frags: Fragment[];
}

/**
 * Timer Format
 */
export type TimerFormat = {
    timestamp: number;
    year: string;
    month: string;
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
};


/**
 * Derive pattern value in type.
 * Allows extracting the start and end parts of a pattern like "[*]".
 */
type DerivedPatternType<T extends string> =
    T extends `${infer Start}*${infer End}`
    ? { readonly start: Start; readonly end: End }
    : never;

/**
 * Derive the valid color types based on a pattern and color keys.
 */
export type DerivedColorType<
    Pattern extends DerivedPatternType<any>,
    Color extends string,
    IncludeSuffix extends boolean
> =
    | `${Pattern["start"]}${string}${Pattern["end"]}.${Color}`
    | (IncludeSuffix extends true
        ? `${Pattern["start"]}${string}${Pattern["end"]}.${Color}-b${string}`
        : never);

/**
 * Create an array of valid derived colors for a pattern and a set of colors.
 */
export type ArrayOfDerivedColorsType<
    Pattern extends DerivedPatternType<any>,
    Colors extends Record<string, any>,
    AllowBold extends boolean
> = {
    [K in keyof Colors & string]: DerivedColorType<Pattern, K, AllowBold>;
}[keyof Colors & string];

/**
 * Derive a valid message type based on a pattern and an array of derived colors.
 */
export type DeriveMessage<
    Pattern extends DerivedPatternType<any>,
    Colors extends Record<string, any>
> = `${string}${ArrayOfDerivedColorsType<Pattern, Colors, true>}`;

/**
 * Derive a valid message type based on a pattern and ensure all colors are used.
 */
type EnsureAllColorsUsed<
    Pattern extends DerivedPatternType<any>,
    Colors extends Record<string, any>
> = keyof Colors extends infer Color
    ? Color extends string
        ? `${string}${`${Pattern["start"]}${string}${Pattern["end"]}.${Color}`}${string}`
        : never
    : never;

/**
 * Derive a valid message type ensuring all colors are included.
 */
export type RequiredDeriveMessage<
    Pattern extends DerivedPatternType<any>,
    Colors extends Record<string, any>
> =
    // Combine the requirements for all colors in `Colors` to appear in the message.
    EnsureAllColorsUsed<Pattern, Colors>;

// Example usage:

// Define a pattern type.
type Pattern = DerivedPatternType<"[*]">;

// Define a set of colors.
const colors = {
    red: "a",
    blue: "b"
};

// Derive a message type based on the pattern and colors.
const test: RequiredDeriveMessage<Pattern, typeof colors> = "hello [test].blue"


export type ExtractString<T extends string> =
    T extends `${string}{${infer C}}${string}` ? C : never;
export { };

type RecordToString<T, Prefix extends string = ''> = {
    [K in keyof T & string]: T[K] extends Record<string, any>
      ? RecordToString<T[K], `${Prefix}${K}.`>
      : { [P in `${Prefix}${K}`]: T[K] };
  }[keyof T & string] extends infer O ? { [K in keyof O]: O[K] } : never;
  