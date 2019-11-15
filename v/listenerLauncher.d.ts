import Listener from "./listener";
import { Destructable, TypeDetectable } from "../tool";
export declare function BasicListenerCreation(element: any): Listener;
export declare function ElementListenerCreation(element: any): Listener | boolean;
export declare type ElementConstructor = (element: object) => Listener | boolean;
export default class ListenerLauncher implements Destructable, TypeDetectable {
    listener: Listener[];
    listenerList: Map<object, Listener>;
    type: string;
    private elementConstructor;
    constructor(elementConstructor: ElementConstructor);
    for(object: object): Listener;
    unload(): boolean;
}
