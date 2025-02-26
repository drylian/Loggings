# Loggings Colors

The `Loggings` system supports a wide variety of colors and text styles, both for the background and for the text itself, using ANSI codes.

## Color Functions

### `Bgc(r: number, g: number, b: number)`
Sets the background color using RGB values.
- **r**: Red value (1 to 255)
- **g**: Green value (1 to 255)
- **b**: Blue value (1 to 255)

```typescript
const backgroundColor = Bgc(255, 0, 0); // Red background
```

### `Rgb(r: number, g: number, b: number)`
Sets the text color using RGB values.
- **r**: Red value (1 to 255)
- **g**: Green value (1 to 255)
- **b**: Blue value (1 to 255)

```typescript
const textColor = Rgb(0, 255, 0); // Green Text
```

## Predefined Color Palette

### Common Colors

Below are the predefined colors that can be used directly in `Loggings`:

- **red**: `Rgb(255, 0, 0)` - Red
- **green**: `Rgb(0, 255, 0)` - Green
- **lime**: `Rgb(128, 255, 128)` - Lime
- **blue**: `Rgb(0, 0, 255)` - Blue
- **yellow**: `Rgb(255, 255, 0)` - Yellow
- **cyan**: `Rgb(0, 255, 255)` - Cyan
- **magenta**: `Rgb(255, 0, 255)` - Magenta
- **black**: `Rgb(0, 0, 0)` - Black
- **white**: `Rgb(255, 255, 255)` - White
- **gray**: `Rgb(128, 128, 128)` - Gray
- **maroon**: `Rgb(128, 0, 0)` - Brown
- **olive**: `Rgb(128, 128, 0)` - Olive
- **navy**: `Rgb(0, 0, 128)` - Navy
- **purple**: `Rgb(128, 0, 128)` - Purple
- **teal**: `Rgb(0, 128, 128)` - Teal
- **silver**: `Rgb(192, 192, 192)` - Silver

### Special Colors

In addition to the common colors, there are a variety of of other predefined colors that can be used:

- **gold**: `Rgb(255, 215, 0)` - Gold
- **pink**: `Rgb(255, 192, 203)` - Pink
- **orange**: `Rgb(255, 165, 0)` - Orange
- **brown**: `Rgb(165, 42, 42)` - Brown
- **peach**: `Rgb(255, 218, 185)` - Peach
- **lavender**: `Rgb(230, 230, 250)` - Lavender
- **coral**: `Rgb(255, 127, 80)` - Coral
- **turquoise**: `Rgb(64, 224, 208)` - Turquoise
- **salmon**: `Rgb(250, 128, 114)` - Salmon

## Text Styles

In addition to colors, you can apply the following styles to text:

- **inverse**: Inverts the background color with the text color `\x1b[7m`
- **reset**: Resets the style `\x1b[0m`
- **bold**: Bold text `\x1b[1m`
- **italic**: Italic text `\x1b[3m`
- **underline**: Underlined text `\x1b[4m`
- **strike**: Strikethrough text `\x1b[9m`
- **blink**: Blinking text `\x1b[5m`
- **hidden**: Hidden text `\x1b[8m`

## ANSI Codes for Texts

These are the codes that can be used directly:

```typescript
import { LoggingsColors } from "loggings";
LoggingsColors.reset // Reset the style
LoggingsColors.bold // Bold
LoggingsColors.italic // Italic
LoggingsColors.underline // Underline
LoggingsColors.strike // Strikethrough
```
