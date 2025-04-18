import { Loggings } from "./mjs/loggings.js";

const logger = new Loggings("Stress Test", "amber50");
logger.log("*-_(Waclient v2.3.0)gb(blue50, purple70)_-*  [ola mundo [verde].green].blue");

logger.log(new Error('tes'))
console.log("continua")