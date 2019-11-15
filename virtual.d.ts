import Site from "./site";
import Tool from "./tool";
import Loader from "./v/loader";
import Listener from "./v/listener";
import ElementListener from "./v/elementListener";
import ListenerLauncher, { ElementListenerCreation, BasicListenerCreation } from "./v/listenerLauncher";
export default class Virtual {
    static Site: typeof Site;
    static Tool: typeof Tool;
    static Loader: typeof Loader;
    static BasicListener: typeof Listener;
    static ElementListener: typeof ElementListener;
    static ListenerLauncher: typeof ListenerLauncher;
    static LoaderItem: {
        Script: import("./v/loader").LoadElement<HTMLScriptElement>;
        Style: import("./v/loader").LoadElement<HTMLLinkElement>;
    };
    static ListenerLauncherItem: {
        ElementListenerCreation: typeof ElementListenerCreation;
        BasicListenerCreation: typeof BasicListenerCreation;
    };
    constructor();
}
