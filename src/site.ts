import Tool, { Destructable } from "./tool";
import ElementBackup from "./v/elementBackup";

export interface SiteConstructOptions {
    predefinedClasses: boolean;
}

export type EnvironmentFunction = ($: Tool) => any | boolean;

export default class Site implements Destructable {
    containerElement: HTMLDivElement;
    htmlElement: HTMLDivElement;
    backup: ElementBackup;
    $: Tool;
    isRunning: boolean = false;
    private envFunction: EnvironmentFunction;

    constructor(options?: SiteConstructOptions) {
        const hasOptions = typeof options !== "undefined";
        if(hasOptions && options.predefinedClasses) {
            this.constructElement(true);
        } else {
            this.constructElement(false);
        }

        this.$ = new Tool(this.htmlElement);
    }

    enableEnvironment() {
        this.backup = new ElementBackup(this.htmlElement);
    }

    restoreEnvironment() {
        const node = this.backup.restore();
        this.containerElement.innerHTML = "";
        this.containerElement.appendChild(node);
        this.htmlElement = this.containerElement.getElementsByTagName("div")[0];
        this.backup = undefined;
        this.$.element = this.htmlElement;
    }

    setEnvironment(environmentFunction: EnvironmentFunction) {
        if(typeof environmentFunction === "function" && !this.isRunning) {
            this.envFunction = environmentFunction;
            return true;
        } else {
            throw new Error("createEnvironment only accepts functions");
            return false;
        }
    }

    runEnvironment(environmentFunction: EnvironmentFunction) {
        if(typeof environmentFunction === "function" && !this.isRunning) {
            this.enableEnvironment();
            this.envFunction(this.$);
            this.isRunning = true;
            return true;
        } else {
            return false;
        }
    }

    createEnvironment(environmentFunction: EnvironmentFunction) {
        if(typeof environmentFunction === "function" && !this.isRunning) {
            this.enableEnvironment();
            this.envFunction = environmentFunction;
            this.envFunction(this.$);
            this.isRunning = true;
            return true;
        } else {
            throw new Error("createEnvironment only accepts functions");
            return false;
        }
    }

    destroy() {
        return this.unload();
    }

    unload() {
        this.envFunction = undefined;
        this.isRunning = false;
        this.restoreEnvironment();
        return this.$.unload();
    }

    private constructElement(predefinedClasses: boolean) {
        this.containerElement = document.createElement("div");
        this.htmlElement = document.createElement("div");
        if(predefinedClasses) {
            this.containerElement.classList.add("virtualContainer");
            this.htmlElement.classList.add("virtualElement");
        }
        this.containerElement.appendChild(this.htmlElement);
    }
}