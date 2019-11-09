import Site from './site';
import Tool from './tool';
import Listener from './v/listener';
import ElementListener from './v/elementListener';

export default class Virtual {
    static Site             = Site;
    static Tool             = Tool;
    static BasicListener    = Listener;
    static ElementListener  = ElementListener;

    constructor() {
        throw new Error('Virtual namespace is not for constructing');
    }
}