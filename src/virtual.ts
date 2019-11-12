import Site from "./site";
import Tool from "./tool";
import Loader, { Script, Style } from "./v/loader";
import Listener from "./v/listener";
import ElementListener from "./v/elementListener";
import ListenerLauncher, { ElementListenerCreation, BasicListenerCreation } from "./v/listenerLauncher";

export default class Virtual {
    static Site             = Site;
    static Tool             = Tool;
    static Loader           = Loader;
    static BasicListener    = Listener;
    static ElementListener  = ElementListener;
    static ListenerLauncher = ListenerLauncher;

    static LoaderItem = {
        Script,
        Style
    };

    static ListenerLauncherItem = {
        ElementListenerCreation,
        BasicListenerCreation
    };

    constructor() {
        throw new Error("Virtual namespace is not for constructing");
    }
}