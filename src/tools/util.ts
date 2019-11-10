export interface PotentialDOMElement {
    nodeType?: number;
    nodeName?: string;
}

export function isDomElement(object: PotentialDOMElement) {
    return  (typeof HTMLElement === 'object' ?
            object instanceof HTMLElement :
            object && typeof object === 'object'
            && object !== null
            && object.nodeType === 1
            && typeof object.nodeName === 'string');
}