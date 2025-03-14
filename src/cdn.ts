export * from "./types";
export * from "./libs/defaults";
export * from "./libs/inspect";
export * from "./libs/pallet";
export * from "./libs/plugins/console";
export * from "./libs/utils";
export * from "./libs/formatkits";
import defaults, { type LoggingsBaseConfig, type LoggingsConstructorConfig } from "./libs/defaults";
import { ConsolePlugin } from "./libs/plugins/console";
import { Runtime, runtime } from "./libs/utils";
import type { LoggingsLevel, LoggingsMessage, LoggingsPlugin, LoggingsPluginsConfig } from "./types";
import type { LoggingsPallet } from "./cdn";

/**
 * Loggings Default Plugins
 */
export const LoggingsDefaultPlugins = [ConsolePlugin];

/**
 * Utility function to initialize and apply plugins
 */
function initializePlugins<Plugins extends LoggingsPlugin<any>[]>(
    plugins: Plugins,
    configs: LoggingsConstructorConfig<Plugins>
): LoggingsConstructorConfig<Plugins> {
    const uniquePlugins = new Set<LoggingsPlugin<any>>();
    plugins.forEach((p) => {
        const plugin = typeof p === "function" ? p() : p;
        if (!uniquePlugins.has(plugin)) {
            uniquePlugins.add(plugin);
            // A configuração do usuário tem prioridade sobre a configuração padrão do plugin
            configs = { ...configs, ...plugin.default };
            if (plugin.onInit) plugin.onInit(configs);
        }
    });
    return configs;
}

export class Loggings<
    const in out Plugins extends LoggingsPlugin<any>[] = typeof LoggingsDefaultPlugins,
> {
    public static configs: Record<string, any> = defaults;
    public configs: LoggingsConstructorConfig<Plugins>;
    public static plugins: LoggingsPlugin<any>[] = LoggingsDefaultPlugins;
    public plugins: Plugins;

    // Old loggings format
    //@ts-expect-error
    constructor(title: string, color?: keyof typeof LoggingsPallet, advanced?: Partial<LoggingsBaseConfig> &
    { plugins?: Plugins } &
        Partial<LoggingsPluginsConfig<Plugins>> = {
            plugins: typeof LoggingsDefaultPlugins
        })
    // New loggings format
    constructor(
        //@ts-expect-error
        advanced: Partial<LoggingsBaseConfig> &
        { plugins?: Plugins } &
            Partial<LoggingsPluginsConfig<Plugins>> = {})
    constructor(opts?: Partial<LoggingsBaseConfig> | string, color: keyof typeof LoggingsPallet = "blue", advanced = {}) {
        // Aplicar as configurações padrão, depois as personalizadas do usuário
        this.configs = { ...(Loggings.configs as LoggingsConstructorConfig<Plugins>), color, ...advanced, ...(typeof opts == "string" ? { title: opts } : opts) };
        this.plugins = [...Loggings.plugins, ...(this.configs.plugins ?? [])] as unknown as Plugins;
        // Inicializar os plugins, garantindo que as configurações do usuário tenham prioridade
        this.configs = initializePlugins(this.plugins, this.configs);
    }

    public config<const NewPlugins extends LoggingsPlugin<any>[] = typeof LoggingsDefaultPlugins>(
        advanced: Partial<LoggingsBaseConfig> &
        { plugins?: NewPlugins } &
            Partial<LoggingsPluginsConfig<NewPlugins>> = {}): Loggings<NewPlugins> {
        // Aplicar as configurações personalizadas primeiro
        this.configs = { ...this.configs, ...advanced };
        // Inicializar os plugins, garantindo que as configurações do usuário tenham prioridade
        this.configs = initializePlugins(advanced.plugins ?? [], this.configs as never) as never;
        this.plugins = [...Loggings.plugins, ...(this.configs.plugins ?? [])] as unknown as Plugins;
        //@ts-expect-error
        return this;
    }

    public static config<const NewPlugins extends LoggingsPlugin<any>[] = typeof LoggingsDefaultPlugins>(
        advanced: Partial<LoggingsBaseConfig> &
        { plugins?: NewPlugins } &
            Partial<LoggingsPluginsConfig<NewPlugins>> = {}): Loggings<NewPlugins> {
        // Aplicar as configurações personalizadas primeiro
        this.configs = { ...this.configs, ...advanced };
        // Inicializar os plugins, garantindo que as configurações do usuário tenham prioridade
        this.configs = initializePlugins(advanced.plugins ?? [], this.configs as never);
        this.plugins = [...Loggings.plugins, ...(this.configs.plugins ?? [])] as never;
        //@ts-expect-error
        return this;
    }

    public controller(msgs: LoggingsMessage[], level: LoggingsLevel) {
        this.plugins.forEach((p) => {
            const plugin = typeof p === "function" ? p() : p;
            try {
                let messages: LoggingsMessage[] | undefined = [];
                if (plugin.onPreMessage) messages = plugin.onPreMessage(this.configs, level, msgs);
                else messages = msgs;
                if (messages && plugin.onMessage) {
                    const message = plugin.onMessage(this.configs, level, messages);
                    if (plugin.onSend) plugin.onSend(this.configs, level, message);
                }
            } catch (e) {
                if (plugin.onError) {
                    plugin.onError(this.configs, e as Error);
                } else { throw e };
            }
        });
    }

    public log(...messages: LoggingsMessage[]) {
        this.controller(messages, "info");
        return this;
    }
    public debug(...messages: LoggingsMessage[]) {
        this.controller(messages, "debug");
        return this;
    }
    public error(...messages: LoggingsMessage[]) {
        this.controller(messages, "error");
        return this;
    }
    public trace(...messages: LoggingsMessage[]) {
        this.controller(messages, "trace");
        return this;
    }
    public info(...messages: LoggingsMessage[]) {
        this.controller(messages, "info");
        return this;
    }
    public warn(...messages: LoggingsMessage[]) {
        this.controller(messages, "warn");
        return this;
    }
}

export default Loggings;