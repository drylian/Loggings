export * from "./src/Loggings.ts";

import { Loggings } from "./src/Loggings.ts";

const logger= new Loggings();
Loggings.useConsole(logger);
console.log("Hi!")