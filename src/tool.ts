import ListenerLauncher, { ElementListenerCreation } from './v/listenerLauncher';

export default class Tool implements Destructable {
    li: ListenerLauncher;
    element: HTMLDivElement;

    constructor(element: HTMLDivElement) {
        this.element = element;
        this.li = new ListenerLauncher(ElementListenerCreation);
    }

    unload() {
        return this.li.unload();
    }
}

export interface Destructable {
    unload: () => any;
}

export interface TypeDetectable {
    type: string;
}