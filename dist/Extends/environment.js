"use strict";
/**
 * Module environment
 * Only add in ts for sup esm and cjs
 */
/* globals WorkerGlobalScope, DedicatedWorkerGlobalScope, SharedWorkerGlobalScope, ServiceWorkerGlobalScope */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isIos = exports.isLinux = exports.isWindows = exports.isMacOs = exports.isServiceWorker = exports.isSharedWorker = exports.isDedicatedWorker = exports.isWebWorker = exports.isJsDom = exports.isElectron = exports.isDeno = exports.isBun = exports.isNode = exports.isBrowser = void 0;
exports.isBrowser = globalThis.window?.document !== undefined;
exports.isNode = globalThis.process?.versions?.node !== undefined;
exports.isBun = globalThis.process?.versions?.bun !== undefined;
exports.isDeno = globalThis.Deno?.version?.deno !== undefined;
exports.isElectron = globalThis.process?.versions?.electron !== undefined;
exports.isJsDom = globalThis.navigator?.userAgent?.includes('jsdom') === true;
//@ts-ignore
exports.isWebWorker = typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope;
//@ts-ignore
exports.isDedicatedWorker = typeof DedicatedWorkerGlobalScope !== 'undefined' && globalThis instanceof DedicatedWorkerGlobalScope;
//@ts-ignore
exports.isSharedWorker = typeof SharedWorkerGlobalScope !== 'undefined' && globalThis instanceof SharedWorkerGlobalScope;
//@ts-ignore
exports.isServiceWorker = typeof ServiceWorkerGlobalScope !== 'undefined' && globalThis instanceof ServiceWorkerGlobalScope;
//@ts-ignore
// Note: I'm intentionally not DRYing up the other variables to keep them "lazy".
const platform = globalThis.navigator?.userAgentData?.platform;
exports.isMacOs = platform === 'macOS'
    || globalThis.navigator?.platform === 'MacIntel' // Even on Apple silicon Macs.
    || globalThis.navigator?.userAgent?.includes(' Mac ') === true
    || globalThis.process?.platform === 'darwin';
exports.isWindows = platform === 'Windows'
    || globalThis.navigator?.platform === 'Win32'
    || globalThis.process?.platform === 'win32';
exports.isLinux = platform === 'Linux'
    || globalThis.navigator?.platform?.startsWith('Linux') === true
    || globalThis.navigator?.userAgent?.includes(' Linux ') === true
    || globalThis.process?.platform === 'linux';
exports.isIos = platform === 'iOS'
    || (globalThis.navigator?.platform === 'MacIntel' && globalThis.navigator?.maxTouchPoints > 1)
    || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform);
exports.isAndroid = platform === 'Android'
    || globalThis.navigator?.platform === 'Android'
    || globalThis.navigator?.userAgent?.includes(' Android ') === true
    || globalThis.process?.platform === 'android';
