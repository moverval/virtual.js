export interface PotentialDOMElement {
    nodeType?: number;
    nodeName?: string;
}

export function isDomElement(object: PotentialDOMElement) {
    return  (typeof object === "object"
            && object !== null
            && object.nodeType === 1
            && typeof object.nodeName === "string");
}

export interface Mapable<T> {
    [name: string]: T;
}