/**
 * Current system used for executing js
 */
export enum AppType {
    Deno,
    Node,
    Bun,
    Browser
}

/**
 * Checker Current Mode application
 */
let SystemExecutor = AppType.Node;
let found = false;

if (!found) try {
    // @ts-ignore Ignore
    if (document) {
        SystemExecutor = AppType.Browser;
        found = true;
    }
} catch {/* ignore */ }

if (!found) try {
    // @ts-ignore Ignore
    if (Deno) {
        SystemExecutor = AppType.Deno;
        found = true;
    }
} catch {/* ignore */ }

if (!found) try {
    // @ts-ignore Ignore
    if (Bun) {
        SystemExecutor = AppType.Bun;
        found = true;
    }
} catch {/* ignore */ }

if (!found) try {
    // @ts-ignore Ignore
    if (process) {
        SystemExecutor = AppType.Node;
        found = true;
    }
} catch {/* ignore */ }

export default SystemExecutor;