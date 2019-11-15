import ListenerLauncher from "./v/listenerLauncher";
import { ScriptLoader, StyleLoader } from "./v/loader";
export default class Tool implements Destructable {
    li: ListenerLauncher;
    element: HTMLDivElement;
    scriptLoader: ScriptLoader;
    styleLoader: StyleLoader;
    constructor(element: HTMLDivElement);
    unload(): boolean;
}
export interface Destructable {
    unload: () => any;
}
export interface TypeDetectable {
    type: string;
}
