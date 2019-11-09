import Listener, { BasicListener } from './listener';
import { Destructable } from '../tool';

export default class ElementListener extends Listener implements Destructable {
    element: HTMLElement;

    constructor(element: HTMLElement) {
        super();
        this.element = element;
        super.setRegisterInterpreter(this.registerInterpreter);
        super.setUnregisterInterpreter(this.unregisterInterpreter);
    }

    registerInterpreter(evtName: string, listener: BasicListener) {
        this.element.addEventListener(evtName, listener);
        return true;
    }

    unregisterInterpreter(evtName: string, listener: BasicListener) {
        this.element.removeEventListener(evtName, listener);
        return true;
    }

    unload() {
        super.unload();
    }
}