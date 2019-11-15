(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Virtual = factory());
}(this, (function () { 'use strict';

    var Listener = (function () {
        function Listener() {
            this.eventList = {};
        }
        Listener.prototype.setRegisterInterpreter = function (interpreter) {
            this.regi = interpreter;
        };
        Listener.prototype.setUnregisterInterpreter = function (interpreter) {
            this.uregi = interpreter;
        };
        Listener.prototype.addEventListener = function (evtName, listener) {
            if (!this.eventList[evtName]) {
                this.eventList[evtName] = [];
            }
            this.eventList[evtName].push(listener);
            if (this.regi) {
                return this.regi(evtName, listener);
            }
            else {
                return false;
            }
        };
        Listener.prototype.removeEventListener = function (evtName, listener) {
            if (this.uregi) {
                return this.uregi(evtName, listener);
            }
            else {
                return false;
            }
        };
        Listener.prototype.unload = function () {
            var success = true;
            var _loop_1 = function (evtName) {
                if (this_1.eventList[evtName]) {
                    var pointer_1 = this_1;
                    this_1.eventList[evtName].forEach(function (listener) {
                        if (!pointer_1.uregi(evtName, listener)) {
                            success = false;
                        }
                    });
                }
            };
            var this_1 = this;
            for (var evtName in this.eventList) {
                _loop_1(evtName);
            }
            this.eventList = {};
            return success;
        };
        return Listener;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var ElementListener = (function (_super) {
        __extends(ElementListener, _super);
        function ElementListener(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _super.prototype.setRegisterInterpreter.call(_this, _this.registerInterpreter);
            _super.prototype.setUnregisterInterpreter.call(_this, _this.unregisterInterpreter);
            return _this;
        }
        ElementListener.prototype.registerInterpreter = function (evtName, listener) {
            this.element.addEventListener(evtName, listener);
            return true;
        };
        ElementListener.prototype.unregisterInterpreter = function (evtName, listener) {
            this.element.removeEventListener(evtName, listener);
            return true;
        };
        ElementListener.prototype.unload = function () {
            return _super.prototype.unload.call(this);
        };
        return ElementListener;
    }(Listener));

    function isDomElement(object) {
        return (typeof object === "object"
            && object !== null
            && object.nodeType === 1
            && typeof object.nodeName === "string");
    }

    function BasicListenerCreation(element) {
        return new Listener();
    }
    function ElementListenerCreation(element) {
        if (isDomElement(element)) {
            return new ElementListener(element);
        }
        else {
            return false;
        }
    }
    var ListenerLauncher = (function () {
        function ListenerLauncher(elementConstructor) {
            this.listenerList = new Map();
            this.type = "ListenerLauncher";
            this.elementConstructor = elementConstructor;
        }
        ListenerLauncher.prototype.for = function (object) {
            if (!this.listenerList.has(object)) {
                var listenerOrBoolean = this.elementConstructor(object);
                if (typeof listenerOrBoolean !== "boolean") {
                    this.listenerList.set(object, listenerOrBoolean);
                }
                else {
                    return null;
                }
            }
            return this.listenerList.get(object);
        };
        ListenerLauncher.prototype.unload = function () {
            var success = true;
            this.listenerList.forEach(function (listener) {
                if (!listener.unload()) {
                    success = false;
                }
            });
            return success;
        };
        return ListenerLauncher;
    }());

    var Script = {
        load: function (path, callback) {
            var script = document.createElement("script");
            var head = document.getElementsByTagName("head")[0];
            script.onload = function () {
                callback(script);
            };
            script.src = path;
            head.appendChild(script);
        },
        unload: function (path, script) {
            var head = document.getElementsByTagName("head")[0];
            head.removeChild(script);
            return true;
        }
    };
    var Style = {
        load: function (path, callback) {
            var link = document.createElement("link");
            var head = document.getElementsByTagName("head")[0];
            link.onload = function () {
                callback(link);
            };
            link.rel = "stylesheet";
            link.href = path;
            head.appendChild(link);
        },
        unload: function (path, link) {
            var head = document.getElementsByTagName("head")[0];
            head.removeChild(link);
            return true;
        }
    };
    var Loader = (function () {
        function Loader(loadElement) {
            this.loaded = new Map();
            this.loadFunction = loadElement.load;
            this.unloadFunction = loadElement.unload;
        }
        Loader.prototype.loadItem = function (path, callback) {
            var _this = this;
            this.loadFunction(path, function (result) {
                if (typeof result !== "boolean" || result !== false) {
                    _this.loaded.set(path, result);
                    if (callback) {
                        return callback(result);
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            });
        };
        Loader.prototype.unloadItem = function (pathOrObject) {
            var _this = this;
            if (typeof pathOrObject === "string") {
                var value = this.loaded.get(pathOrObject);
                if (value) {
                    return this.unloadFunction(pathOrObject, value);
                }
                else {
                    return false;
                }
            }
            else {
                var path = Object.keys(this.loaded).find(function (key) { return _this.loaded[key] === pathOrObject; });
                if (path) {
                    return this.unloadFunction(path, pathOrObject);
                }
                else {
                    return false;
                }
            }
        };
        Loader.prototype.unload = function () {
            var _this = this;
            var success = true;
            this.loaded.forEach(function (value, path) {
                if (!_this.unloadFunction(path, value)) {
                    success = false;
                }
            });
            this.loaded.clear();
            return success;
        };
        return Loader;
    }());

    var Tool = (function () {
        function Tool(element) {
            this.element = element;
            this.li = new ListenerLauncher(ElementListenerCreation);
            this.scriptLoader = new Loader(Script);
            this.styleLoader = new Loader(Style);
        }
        Tool.prototype.unload = function () {
            return this.li.unload()
                && this.scriptLoader.unload()
                && this.styleLoader.unload();
        };
        return Tool;
    }());

    var ElementBackup = (function () {
        function ElementBackup(element) {
            this.node = element.cloneNode(true);
        }
        ElementBackup.prototype.restore = function () {
            return this.node;
        };
        return ElementBackup;
    }());

    var Site = (function () {
        function Site(options) {
            this.isRunning = false;
            this.extraFunctions = [];
            var hasOptions = typeof options !== "undefined";
            if (hasOptions && options.predefinedClasses) {
                this.constructElement(true);
            }
            else {
                this.constructElement(false);
            }
            this.$ = new Tool(this.htmlElement);
        }
        Site.prototype.loadHTML = function (uri, cb) {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.onload = function (evt) {
                _this.htmlElement.innerHTML = xhr.responseText;
                if (cb) {
                    return cb(xhr);
                }
                else {
                    return true;
                }
            };
            xhr.open("GET", uri);
            xhr.send();
        };
        Site.prototype.enableEnvironment = function () {
            if (!this.backup) {
                this.backup = new ElementBackup(this.htmlElement);
            }
            else {
                throw new Error("Environment already enabled");
            }
        };
        Site.prototype.restoreEnvironment = function () {
            if (this.backup) {
                var node = this.backup.restore();
                this.containerElement.innerHTML = "";
                this.containerElement.appendChild(node);
                this.htmlElement = this.containerElement.getElementsByTagName("div")[0];
                this.deleteBackup();
                this.$.element = this.htmlElement;
            }
            else {
                throw new Error("No Environment was created.");
            }
        };
        Site.prototype.setEnvironment = function (environmentFunction) {
            if (typeof environmentFunction === "function" && !this.isRunning) {
                this.envFunction = environmentFunction;
                return true;
            }
            else {
                throw new Error("createEnvironment only accepts functions");
            }
        };
        Site.prototype.runEnvironment = function () {
            if (typeof this.envFunction === "function" && !this.isRunning) {
                this.enableEnvironment();
                this.envFunction(this.$);
                this.isRunning = true;
                return true;
            }
            else {
                return false;
            }
        };
        Site.prototype.createEnvironment = function (environmentFunction) {
            if (typeof environmentFunction === "function" && !this.isRunning) {
                this.enableEnvironment();
                this.envFunction = environmentFunction;
                this.envFunction(this.$);
                this.isRunning = true;
                return true;
            }
            else {
                throw new Error("createEnvironment only accepts functions");
            }
        };
        Site.prototype.addEnvironment = function (environmentFunction) {
            if (typeof environmentFunction === "function" && this.isRunning) {
                var count = this.extraFunctions.push(environmentFunction);
                this.extraFunctions[count - 1](this.$);
                return true;
            }
            else {
                return false;
            }
        };
        Site.prototype.deleteBackup = function () {
            this.backup = undefined;
        };
        Site.prototype.removeEnvFunc = function () {
            this.extraFunctions = [];
            this.envFunction = null;
        };
        Site.prototype.reset = function () {
            return this.unload();
        };
        Site.prototype.unload = function () {
            this.removeEnvFunc();
            this.isRunning = false;
            this.restoreEnvironment();
            return this.$.unload();
        };
        Site.prototype.constructElement = function (predefinedClasses) {
            this.containerElement = document.createElement("div");
            this.htmlElement = document.createElement("div");
            if (predefinedClasses) {
                this.containerElement.classList.add("virtualContainer");
                this.htmlElement.classList.add("virtualElement");
            }
            this.containerElement.appendChild(this.htmlElement);
        };
        return Site;
    }());

    var Virtual = (function () {
        function Virtual() {
            throw new Error("Virtual namespace is not for constructing");
        }
        Virtual.Site = Site;
        Virtual.Tool = Tool;
        Virtual.Loader = Loader;
        Virtual.BasicListener = Listener;
        Virtual.ElementListener = ElementListener;
        Virtual.ListenerLauncher = ListenerLauncher;
        Virtual.LoaderItem = {
            Script: Script,
            Style: Style
        };
        Virtual.ListenerLauncherItem = {
            ElementListenerCreation: ElementListenerCreation,
            BasicListenerCreation: BasicListenerCreation
        };
        return Virtual;
    }());

    return Virtual;

})));
