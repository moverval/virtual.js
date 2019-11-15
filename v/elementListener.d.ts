import Listener, { BasicListener } from "./listener";
import { Destructable } from "../tool";
export default class ElementListener extends Listener implements Destructable {
    element: HTMLElement;
    constructor(element: HTMLElement);
    registerInterpreter(evtName: string, listener: BasicListener): boolean;
    unregisterInterpreter(evtName: string, listener: BasicListener): boolean;
    unload(): boolean;
}
