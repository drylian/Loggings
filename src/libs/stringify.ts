import { Fragment } from "./fragment";
import _inspect from "./inspect";
import { colorpik, LoggingsPallet } from "./pallet";

export default function (
    _options: {
        colors?: Record<string, string>;
        format?: string;
        prefix?: string;
    } = {},
    ...messages: any[]
) {
    const options = {
        colors: { ...LoggingsPallet, ...(_options?.colors ? _options.colors : {}) },
        format: _options?.format ? _options.format : "<*>",
        prefix: _options?.prefix ? _options.prefix : "[*]",
    }
    let console = "";
    let register = "";
    const [a, b] = options.format.split("*");
    const keys = Object.keys(options.colors);
    messages.forEach((message) => {
        if (typeof message === "string") {
            const response = Fragment(message, options.format, options.prefix);
            let console_text = response.text;
            let register_text = response.text;
            response.frags.forEach(frag => {
                let fragmented = frag.value;

                if (frag.bold) fragmented = colorpik("bold", frag.value, options.colors);

                if (keys.includes(frag.key)) {
                    fragmented = colorpik(frag.key as keyof typeof options.colors, fragmented, options.colors);
                }
                
                console_text = console_text.replace(a + frag.key + b, fragmented);
                register_text = register_text.replace(a + frag.key + b, fragmented);
            })
            console += console_text;
            register += register_text;
        } else {
            console += _inspect(message);
            register += _inspect(message, true);
        }
    })
    return [console, register];
}
