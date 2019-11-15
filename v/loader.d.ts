import { Destructable } from "../tool";
export interface LoadElement<T> {
    load: LoadFunction<T>;
    unload: UnloadFunction<T>;
}
export declare type ScriptLoader = Loader<HTMLScriptElement>;
export declare type StyleLoader = Loader<HTMLLinkElement>;
export declare type LoadCallback<P> = (object: P) => any | boolean;
export declare type LoadFunction<R> = (path: string, callback: LoadCallback<R>) => any;
export declare type UnloadFunction<R> = (path: string, object: R) => boolean;
export declare const Script: LoadElement<HTMLScriptElement>;
export declare const Style: LoadElement<HTMLLinkElement>;
export default class Loader<R> implements Destructable {
    loadFunction: LoadFunction<R>;
    unloadFunction: UnloadFunction<R>;
    loaded: Map<string, R>;
    constructor(loadElement: LoadElement<R>);
    loadItem(path: string, callback?: LoadCallback<R>): void;
    unloadItem(pathOrObject: string | R): boolean;
    unload(): boolean;
}
