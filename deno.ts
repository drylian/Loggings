export * from "./src/mod.ts";

import { Loggings } from "./src/mod.ts";

const logger= new Loggings();
// Loggings.useConsole(logger);
logger.log("Hi!")