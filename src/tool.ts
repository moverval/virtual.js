import ListenerLauncher, { ElementListenerCreation } from "./v/listenerLauncher";
import Loader, { ScriptLoader, StyleLoader, Script as ScriptLoaderConfig, Style as StyleLoaderConfig } from "./v/loader";

export default class Tool implements Destructable {
    li: ListenerLauncher;
    element: HTMLDivElement;
    scriptLoader: ScriptLoader;
    styleLoader: StyleLoader;

    constructor(element: HTMLDivElement) {
        this.element = element;
        this.li = new ListenerLauncher(ElementListenerCreation);
        this.scriptLoader = new Loader(ScriptLoaderConfig);
        this.styleLoader = new Loader(StyleLoaderConfig);
    }

    unload() {
        return  this.li.unload()
                && this.scriptLoader.unload()
                && this.styleLoader.unload();
    }
}

export interface Destructable {
    unload: () => any;
}

export interface TypeDetectable {
    type: string;
}