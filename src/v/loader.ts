import { Mapable } from "../tools/util";
import { Destructable } from "../tool";

export interface LoadElement<T> {
    load: LoadFunction<T>;
    unload: UnloadFunction<T>;
}

export type ScriptLoader = Loader<HTMLScriptElement>;
export type StyleLoader = Loader<HTMLLinkElement>;
export type LoadCallback<P> = (object: P) => any|boolean;
export type LoadFunction<R> = (path: string, callback: LoadCallback<R>) => any;
export type UnloadFunction<R> = (path: string, object: R) => boolean;

export const Script: LoadElement<HTMLScriptElement> = {
    load: (path: string, callback: LoadCallback<HTMLScriptElement>) => {
        const script = document.createElement("script");
        const head = document.getElementsByTagName("head")[0];
        script.onload = () => {
            callback(script);
        };
        script.src = path;
        head.appendChild(script);
    },
    unload: (path: string, script: HTMLScriptElement) => {
        const head = document.getElementsByTagName("head")[0];
        head.removeChild(script);
        return true;
    }
};

export const Style: LoadElement<HTMLLinkElement> = {
    load: (path: string, callback: LoadCallback<HTMLLinkElement>) => {
        const link = document.createElement("link");
        const head = document.getElementsByTagName("head")[0];
        link.onload = () => {
            callback(link);
        };
        link.rel = "stylesheet";
        link.href = path;
        head.appendChild(link);
    },
    unload: (path: string, link: HTMLLinkElement) => {
        const head = document.getElementsByTagName("head")[0];
        head.removeChild(link);
        return true;
    }
};

export default class Loader<R> implements Destructable {
    loadFunction: LoadFunction<R>;
    unloadFunction: UnloadFunction<R>;
    loaded: Map<string, R>;

    constructor(loadElement: LoadElement<R>) {
        this.loaded = new Map();
        this.loadFunction = loadElement.load;
        this.unloadFunction = loadElement.unload;
    }

    loadItem(path: string, callback?: LoadCallback<R>) {
        this.loadFunction(path, (result) => {
            if(typeof result !== "boolean" || result !== false) {
                this.loaded.set(path, result);
                if(callback) {
                    return callback(result);
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
    }

    unloadItem(pathOrObject: string|R) {
        if(typeof pathOrObject === "string") {
            const value = this.loaded.get(pathOrObject);
            if(value) {
                return this.unloadFunction(pathOrObject, value);
            } else {
                return false;
            }
        } else {
            const path = Object.keys(this.loaded).find(key => this.loaded[key] === pathOrObject);
            if(path) {
                return this.unloadFunction(path, pathOrObject);
            } else {
                return false;
            }
        }
    }

    unload() {
        let success = true;
        this.loaded.forEach((value, path) => {
            if(!this.unloadFunction(path, value)) {
                success = false;
            }
        });
        this.loaded.clear();
        return success;
    }
}