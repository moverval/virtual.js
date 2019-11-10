import Listener from './listener';
import ElementListener from './elementListener';
import { Destructable, TypeDetectable } from '../tool';
import { isDomElement } from '../tools/util';

export function BasicListenerCreation(element): Listener {
    return new Listener();
}

export function ElementListenerCreation(element): Listener | boolean {
    if(isDomElement(element)) {
        return new ElementListener(element);
    } else {
        return false;
    }
}

export type ElementConstructor = (element: object) => Listener | boolean;

export default class ListenerLauncher implements Destructable, TypeDetectable {
    listener: Listener[];
    listenerList: Map<object, Listener> = new Map();
    type: string = 'ListenerLauncher';
    private elementConstructor: ElementConstructor;

    constructor(elementConstructor: ElementConstructor) {
        this.elementConstructor = elementConstructor;
    }

    for(object: object) {
        if(!this.listenerList.has(object)) {
            const listenerOrBoolean = this.elementConstructor(object);
            if(typeof listenerOrBoolean !== 'boolean') {
                this.listenerList.set(object, listenerOrBoolean);
            } else {
                return null;
            }
        }

        return this.listenerList.get(object);
    }

    unload() {
        let success = true;
        this.listenerList.forEach((listener) => {
            if(!listener.unload()) {
                success = false;
            }
        });
        return success;
    }
}