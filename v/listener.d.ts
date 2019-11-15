import { Destructable } from "../tool";
import { Mapable } from "../tools/util";
export declare type BasicListener = (...event: object[]) => any;
export declare type ListenerInterpreter = (evtName: string, listener: BasicListener) => boolean;
export default class Listener implements Destructable {
    eventList: Mapable<BasicListener[]>;
    private regi;
    private uregi;
    setRegisterInterpreter(interpreter: ListenerInterpreter): void;
    setUnregisterInterpreter(interpreter: ListenerInterpreter): void;
    addEventListener(evtName: string, listener: BasicListener): boolean;
    removeEventListener(evtName: string, listener: BasicListener): boolean;
    unload(): boolean;
}
