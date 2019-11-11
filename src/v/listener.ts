import { Destructable } from "../tool";
import { Mapable } from "../tools/util";

export type BasicListener = (...event: object[]) => any;
export type ListenerInterpreter = (evtName: string, listener: BasicListener) => boolean;

export default class Listener implements Destructable {
    eventList: Mapable<BasicListener[]> = {};
    private regi: ListenerInterpreter; // Listener Interpreter for registering
    private uregi: ListenerInterpreter; // Listener Interpreter for unregistering

    setRegisterInterpreter(interpreter: ListenerInterpreter) {
        this.regi = interpreter;
    }

    setUnregisterInterpreter(interpreter: ListenerInterpreter) {
        this.uregi = interpreter;
    }

    addEventListener(evtName: string, listener: BasicListener): boolean {
        if(!this.eventList[evtName]) {
            this.eventList[evtName] = [];
        }
        this.eventList[evtName].push(listener);
        if(this.regi) {
            return this.regi(evtName, listener);
        } else {
            return false;
        }
    }

    removeEventListener(evtName: string, listener: BasicListener): boolean {
        if(this.uregi) {
            return this.uregi(evtName, listener);
        } else {
            return false;
        }
    }

    unload() {
        let success = true;
        for(const evtName in this.eventList) {
            if(this.eventList[evtName]) {
                const pointer = this;
                this.eventList[evtName].forEach((listener) => {
                    if(!pointer.uregi(evtName, listener)) {
                        success = false;
                    }
                });
            }
        }
        this.eventList = {};
        return success;
    }
}