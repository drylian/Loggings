## Loggings Colors

### Loggings Current Text Colors

```ts
/**
 * Colors Supported, Rgb is value in Red,Green and Blue of color
 */
const Colors = {
    red: Rgb(255, 0, 0),
    green: Rgb(0, 255, 0),
    lime: Rgb(128, 255, 128),
    blue: Rgb(0, 0, 255),
    yellow: Rgb(255, 255, 0),
    cyan: Rgb(0, 255, 255),
    magenta: Rgb(255, 0, 255),
    black: Rgb(0, 0, 0),
    white: Rgb(255, 255, 255),
    gray: Rgb(128, 128, 128),
    maroon: Rgb(128, 0, 0),
    olive: Rgb(128, 128, 0),
    navy: Rgb(0, 0, 128),
    purple: Rgb(128, 0, 128),
    teal: Rgb(0, 128, 128),
    silver: Rgb(192, 192, 192),
    indigo: Rgb(75, 0, 130),
    gold: Rgb(255, 215, 0),
    pink: Rgb(255, 192, 203),
    orange: Rgb(255, 165, 0),
    brown: Rgb(165, 42, 42),
    peach: Rgb(255, 218, 185),
    lavender: Rgb(230, 230, 250),
}
```

### Loggings Current Background Colors

```ts
/**
 * Colors Supported, Rgb is value in Red,Green and Blue of color
 */
const Colors = {
    bred: Rgb(255, 0, 0),
    bgreen: Rgb(0, 255, 0),
    blime: Rgb(128, 255, 128),
    bblue: Rgb(0, 0, 255),
    byellow: Rgb(255, 255, 0),
    bcyan: Rgb(0, 255, 255),
    bmagenta: Rgb(255, 0, 255),
    bblack: Rgb(0, 0, 0),
    bwhite: Rgb(255, 255, 255),
    bgray: Rgb(128, 128, 128),
    bmaroon: Rgb(128, 0, 0),
    bolive: Rgb(128, 128, 0),
    bnavy: Rgb(0, 0, 128),
    bpurple: Rgb(128, 0, 128),
    bteal: Rgb(0, 128, 128),
    bsilver: Rgb(192, 192, 192),
    bindigo: Rgb(75, 0, 130),
    bgold: Rgb(255, 215, 0),
    bpink: Rgb(255, 192, 203),
    borange: Rgb(255, 165, 0),
    bbrown: Rgb(165, 42, 42),
    bpeach: Rgb(255, 218, 185),
    blavender: Rgb(230, 230, 250),
}
```

These color constants can be used to customize the appearance of log messages in your application.
Uses 
```ts
/**
 * [].color
 * or [].color-b // color +  bold
 */

import  { Loggings } from "loggings";
const core = new Loggings("Exemple");
core.log("This is [Exemple].green of green color, this is [green bold].green-b")
core.log("This is [Exemple].bgreen of background green color")

```