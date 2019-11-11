import { Mapable } from "../tools/util";

export default class ElementBackup {
    style: Mapable<string> = {};

    constructor(element: HTMLElement) {
        for(const styleType in element.style) {
            if(typeof styleType === "string") {
                this.style[styleType] = element.style[styleType];
            }
        }
    }

    restore(element: HTMLElement) {
        for(const styleType in this.style) {
            if(typeof styleType === "string") {
                element.style[styleType] = this.style[styleType];
            }
        }
    }
}