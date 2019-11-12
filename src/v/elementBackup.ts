import { Mapable } from "../tools/util";

export default class ElementBackup {
    node: Node;

    constructor(element: HTMLElement) {
        this.node = element.cloneNode(true);
    }

    restore() {
        return this.node;
    }
}