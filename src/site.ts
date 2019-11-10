import Tool, { Destructable } from './tool';

export interface SiteConstructOptions {
    predefinedClasses: boolean;
}

export type EnvironmentFunction = ($: Tool) => any | boolean;

export default class Site implements Destructable {
    htmlElement: HTMLDivElement;
    $: Tool;
    isRunning: boolean = false;
    private envFunction: EnvironmentFunction;

    constructor(options?: SiteConstructOptions) {
        const hasOptions = typeof options !== 'undefined';
        if(hasOptions && options.predefinedClasses) {
            this.constructElement(true);
        } else {
            this.constructElement(false);
        }

        this.$ = new Tool(this.htmlElement);
    }

    setEnvironment(environmentFunction: EnvironmentFunction) {
        if(typeof environmentFunction === 'function' && !this.isRunning) {
            this.envFunction = environmentFunction;
            return true;
        } else {
            throw new Error('createEnvironment only accepts functions');
            return false;
        }
    }

    runEnvironment(environmentFunction: EnvironmentFunction) {
        if(typeof environmentFunction === 'function' && !this.isRunning) {
            this.envFunction(this.$);
            this.isRunning = true;
            return true;
        } else {
            return false;
        }
    }

    createEnvironment(environmentFunction: EnvironmentFunction) {
        if(typeof environmentFunction === 'function' && !this.isRunning) {
            this.envFunction = environmentFunction;
            this.envFunction(this.$);
            this.isRunning = true;
            return true;
        } else {
            throw new Error('createEnvironment only accepts functions');
            return false;
        }
    }

    destroy() {
        return this.unload();
    }

    unload() {
        this.envFunction = undefined;
        this.isRunning = false;
        return this.$.unload();
    }

    private constructElement(predefinedClasses: boolean) {
        this.htmlElement = document.createElement('div');
        if(predefinedClasses) {
            this.htmlElement.classList.add('virtualContainer');
        }
    }
}