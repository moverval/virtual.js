import Tool, { Destructable } from "./tool";
import ElementBackup from "./v/elementBackup";
export interface SiteConstructOptions {
    predefinedClasses: boolean;
}
export declare type EnvironmentFunction = ($: Tool) => any | boolean;
export declare type HTMLResponseCallback = (request: XMLHttpRequest) => any;
export default class Site implements Destructable {
    containerElement: HTMLDivElement;
    htmlElement: HTMLDivElement;
    backup: ElementBackup;
    $: Tool;
    isRunning: boolean;
    private extraFunctions;
    private envFunction;
    constructor(options?: SiteConstructOptions);
    loadHTML(uri: string, cb: HTMLResponseCallback): void;
    enableEnvironment(): void;
    restoreEnvironment(): void;
    setEnvironment(environmentFunction: EnvironmentFunction): boolean;
    runEnvironment(): boolean;
    createEnvironment(environmentFunction: EnvironmentFunction): boolean;
    addEnvironment(environmentFunction: EnvironmentFunction): boolean;
    deleteBackup(): void;
    removeEnvFunc(): void;
    reset(): boolean;
    unload(): boolean;
    private constructElement;
}
