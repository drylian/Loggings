"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unlinker = void 0;
const path_1 = __importStar(require("path"));
const fs_1 = __importStar(require("fs"));
const Console_1 = require("./Console");
/**
 * Unlinker
 * @param options Loggings Configurations
 * @param pather Location for files
 */
function Unlinker(options, pather) {
    if (options.register_del && options.register_limit > 0) {
        const logFilesPattern = new RegExp(`.*_${options.current_level}.${options.register_type}`);
        const logFiles = fs_1.default
            .readdirSync(pather)
            .filter((file) => logFilesPattern.test(file))
            .sort((a, b) => {
            const aStat = (0, fs_1.statSync)((0, path_1.join)(pather, a));
            const bStat = (0, fs_1.statSync)((0, path_1.join)(pather, b));
            return aStat.mtime.getTime() - bStat.mtime.getTime();
        });
        const filesToDelete = logFiles.slice(0, logFiles.length - options.register_limit); // Get the oldest files to delete
        filesToDelete.forEach((file) => {
            const filePath = path_1.default.join(pather, file);
            (0, Console_1.Console)("Loggings", "red", `old register "${options.register_type}" deleted : ["${(0, path_1.resolve)(process.cwd(), filePath)}"].red`);
            fs_1.default.unlinkSync(filePath);
        });
    }
}
exports.Unlinker = Unlinker;
