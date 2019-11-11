import Site from "./site";
import Tool from "./tool";
import Listener from "./v/listener";
import ElementListener from "./v/elementListener";
import ListenerLauncher from "./v/listenerLauncher";

export default class Virtual {
    static Site             = Site;
    static Tool             = Tool;
    static BasicListener    = Listener;
    static ElementListener  = ElementListener;
    static ListenerLauncher = ListenerLauncher;

    constructor() {
        throw new Error("Virtual namespace is not for constructing");
    }
}