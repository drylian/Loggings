# Loggings Plugins

`Loggings` has a plugin system that allows you to increase or reduce the functionality of the logging system. Plugins can add new features, improve performance or integrate with other systems. The `Loggings` configuration can be adjusted according to the plugins used.

## Native Plugins

### 1. File Logging Plugin

This plugin allows you to log logs to files. It is useful for keeping a history of logs, even after closing the application.

#### Usage

```typescript
// this is
import { Loggings , LoggingsRegister } from "loggings";

Loggings.add(LoggingsRegister);
const logger = new Loggings("MyApp");
logger.info("This is an info message.");
```

### 3. Console Plugin

This plugin allows you to send logs to the console in customizable ways.

#### Usage

```typescript
import { Loggings, LoggingsConsole } from "loggings";
Loggings.add(LoggingsConsole);

const logger = new Loggings("MyApp");
logger.info("This is an info message.");
```

## How to Add Plugins

To add a plugin to `Loggings`, use the `logger.add()` method, passing in an instance of the plugin. Be sure to configure the plugin as needed.

## Configuring Loggings with Plugins

The `Loggings` configuration can be increased or decreased depending on the plugins installed. For example, when using the file logging plugin, you may need to configure the file path and log level.

### Combined Configuration Example 

```typescript
import { Loggings } from "loggings";

const logger = new Loggings("MyApp");

// Logging Configuration Loggings.config({ format: "[{status}] [{hours}:{minutes}:{seconds}].gray {message}", level: "info", console: true, title: "My Application", color: "blue" });

// Add the logging plugin to file logger.use(new FileLogger({ file: "./logs/app.log", level: "info" }));

logger.info("This is an info message.");
```
