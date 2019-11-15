export interface PotentialDOMElement {
    nodeType?: number;
    nodeName?: string;
}
export declare function isDomElement(object: PotentialDOMElement): boolean;
export interface Mapable<T> {
    [name: string]: T;
}
