import ElementListener from './v/elementListener';

export default class Tool implements Destructable {
    li: ElementListener;
    private mainElement: HTMLDivElement;

    constructor(element: HTMLDivElement) {
        this.mainElement = element;
        this.li = new ElementListener(element);
    }

    unload() {
        this.li.unload();
    }
}

export interface Destructable {
    unload: () => any;
}