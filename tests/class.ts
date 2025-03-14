import { Test } from "../tools/Tester.ts";
import { Loggings, type LoggingsPluginData } from "../src/loggings.ts";

let statistics_results: string[] = [];
const statistics:LoggingsPluginData<{}> ={
    default:{},
    ident:"statistics",
    onInit() {
        statistics_results.push("onInit");
    },
    onPreMessage(_,__,___) {
        if(___[0] == "error") throw new Error("Test!");
        statistics_results.push("onPreMessage");
        return ___;
    },
    onMessage(_,__,___) {
        statistics_results.push("onMessage");
        return "";
    },
    onSend(_,__,___) {
        statistics_results.push("onSend");
        return "";
    },
    onError() {
        statistics_results.push("onError");
    }
}
Loggings.config({
    plugins:[statistics]
})
// Teste para onInit
new Test({
    name: "onInit Action",
    desc: "Check trigger onInit event plugin",
    fn() {
        // Reinicia o array de resultados
        statistics_results = [];

        // Inicializa o Loggings (deve chamar onInit)
        new Loggings("testing");

        if (!statistics_results.includes("onInit")) {
            throw new Error(`Test failed. Expected call event onInit but not found`);
        }
    },
});

// Teste para onPreMessage
new Test({
    name: "onPreMessage Action",
    desc: "Check trigger onPreMessage event plugin",
    fn() {
        // Reinicia o array de resultados
        statistics_results = [];

        // Envia uma mensagem (deve chamar onPreMessage)
        new Loggings("testing").log("a");

        if (!statistics_results.includes("onPreMessage")) {
            throw new Error(`Test failed. Expected call event onPreMessage but not found`);
        }
    },
});

// Teste para onMessage
new Test({
    name: "onMessage Action",
    desc: "Check trigger onMessage event plugin",
    fn() {
        // Reinicia o array de resultados
        statistics_results = [];

        // Envia uma mensagem (deve chamar onMessage)
        new Loggings("testing").log("a");

        if (!statistics_results.includes("onMessage")) {
            throw new Error(`Test failed. Expected call event onMessage but not found`);
        }
    },
});

// Teste para onSend
new Test({
    name: "onSend Action",
    desc: "Check trigger onSend event plugin",
    fn() {
        // Reinicia o array de resultados
        statistics_results = [];

        // Envia uma mensagem (deve chamar onSend)
        new Loggings("testing").log("a");

        if (!statistics_results.includes("onSend")) {
            throw new Error(`Test failed. Expected call event onSend but not found`);
        }
    },
});

// Teste para onError
new Test({
    name: "onError Action",
    desc: "Check trigger onError event plugin",
    fn() {
        // Reinicia o array de resultados
        statistics_results = [];

        new Loggings("testing").log("error");

        if (!statistics_results.includes("onError")) {
            throw new Error(`Test failed. Expected call event onError but not found`);
        }
    },
});