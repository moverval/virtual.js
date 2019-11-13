# VirtualJS
[![Build Status](https://travis-ci.org/MMNN321/virtual-js.svg?branch=master)](https://travis-ci.org/MMNN321/virtual-js) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/a7f8133f8c7a4f59aa829c7b75a21233)](https://www.codacy.com/manual/MMNN321/virtual-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MMNN321/virtual-js&amp;utm_campaign=Badge_Grade) [![CodeFactor](https://www.codefactor.io/repository/github/mmnn321/virtual-js/badge)](https://www.codefactor.io/repository/github/mmnn321/virtual-js)

## (For) what is VirtualJS?

``VirtualJS`` is a library for web-development. It was created to seperate different javascript tasks and html elements. This is useful because on every interactive website, content needs to respond to the user. Because of the different actions that are needed to display content correctly it quickly becomes complex and the different javscript tasks overlap. New Things have to be added (scripts, styles, elements or listeners) and the script goes slower after time because no longer relevant listeners, scripts and styles are not getting removed. ``VirtualJS`` is tracking this imports and they can be removed with one function. ``VirtualJS`` also provides an environment where all variables are getting deleted on cleanup (this prevents errors e.g. when a script file is included twice). This splitting is very powerful and can be configured with different components. It works in every popular browser (also IE) and can be integrated quickly. It is also important to know that ``VirtualJS`` can be used in different ways because of the non dependent objects. It can also extend with plugins created by users.

## Setup

VirtualJS comes with a [prebuilt package](https://github.com/MMNN321/virtual-js/tree/build). If you need to build the package by yourself, clone the source, install the modules/packages and use the build command to build it.

Here is the detailed way:

Use git to clone the repository:
```
git clone https://github.com/MMNN321/virtual-js.git
```

After the project is downloaded, the packages can be installed that are required to run the project:
```
npm ci
```

``npm ci`` is the standard command that is used for it. If problems occur, ``npm i`` or ``npm install`` can also be used to install the packages.


The last step is to build the project. The project builds with ``rollup`` and it can easily be called by typing:
```
npm run build
```

Building works on windows and on linux with no errors (not tested on mac, but there is no reason why it shouldn't work). If you have problems with building, please send this as a [new issue](https://github.com/MMNN321/virtual-js/issues/new).

The build should now appear in a new folder named ``dist``.

## Documentation

``VirtualJS`` was built with ``typescript`` and works with objects ([see above](#for-what-is-virtualjs)).
Every component programmed in ``VirtualJS`` is defined in a namespace named ``Virtual``.

Every component is useable but not every way of using them was tested. It is recommended to start with the ``Site`` object because it constructs the elements in ``Virtual`` automatically (unitl now, all objects are subcomponents of ``Site``).

### Site

Site object simulates a field on the website. It can register all types of elements and events. It exists through two html elements (``virtualContainer``, ``virtualElement``). It is also important to know that all objects can only be accessed at public state. To look how the functions in the objects can be used, look at the [typescript define file](https://github.com/MMNN321/virtual-js/blob/build/site.d.ts).

```js
var site = new Virtual.Site();
```

The site can be constructed differently and accepts settings to configure it (more at [Types:SiteConstructOptions](#siteconstructoptions)).

```js
var site = new Virtual.Site({predefinedClasses: true});
```

#### Site.createEnvironment

Executes an [environment function](#environmentfunction) and tracks changes on the virtual element and on the virtual tool (everything before can be restored).

Example:
```js
site.createEnvironment(function($) {
    // Code
});
```

##### $

The parameter for the function is the [Tool](#tool) object of the site. It is for tracking extra things that are not linked with the element or for calling objects that are referenced with the environment.

#### Site.setEnvironment

Sets a new function as the public environment. This will not affect anything until [runEnvironment](#siterunenvironment) was called. If both functions are called, they will execute the same way as [createEnvironment](#sitecreateenvironment).

Example:

```ts
site.setEnvironment(function($) { // Function will not execute
    // Code
});
```

#### Site.runEnvironment

It executes the [environment function](#environmentfunction). If no environment was set, this function will return false.

#### Site.enableEnvironment

Enables the environment. This function is automatically getting called by [createEnvironment](#sitecreateenvironment) and [runEnvironment](#siterunenvironment). When enabled, it can not be activated again before [restoreEnvironment](#siterestoreenvironment) or [deleteBackup](#sitedeletebackup) has been called. If this function gets called when the environment is active, this function will throw an error.

#### Site.restoreEnvironment

When called, this function will restore the element. Listeners that were constructed with [Tool](#tool) will not be removed when they were not bound to a virtual element (an element that was constructed by VirtualJS).

#### Site.deleteBackup

This will delete the restore point for the virtual element. After a call, the environment cannot restore anymore.

#### Site.unload

The function to unload all things. After a call, all [listeners](#basiclistener), [loaders](#loader) and Backup managers restore.
This will reset the element, unload all listeners and remove all imports that were made with the loader. After restoring, the object can be used again. The function returns true if all elements destructed successfully, else there are uncompleted processes running in background which cannot be finished (this should not happen in current version).

#### Site.restore

This is a reference to [unload](#siteunload). Nothing changes here.

### Tool

The ``Tool`` object is used to store extra functions and objects that are not available in normal ``javascript`` but wich can be helpful to integrate. It can also store a default html element when a [Site](#site) is the parent of the ``Tool`` object.

A ``Tool`` object that was built in [Site](#site) always has the name ``$``.

#### li

Type: *object*

``li`` is an object that was built from [ListenerLauncher](#listenerlauncher). This element can load, unload and auto destroy events when they need to be deleted.

#### scriptLoader

Type: *object*

``scriptLoader`` is an object that was built from [Loader](#loader). It is for loading and unloading scripts. When they need to be deleted ``scriptLoader`` does it automatically.

#### styleLoader

Type: *object*

``styleLoader`` is an object that was built from [Loader](#loader). It is for loading and unloading styles. When they need to be deleted ``styleLoader`` does it automatically.

#### element

Type: *HTMLDivElement*

``element`` is only available when ``Tool`` was constructed by a [Site](#site) object. If it was, ``element`` is a reference to the ``virtual html element`` (the element that was constructed by ``VirtualJS``).

### BasicListener

This is the ``Basic Listener`` object. It isn't useable, except ``setRegisterInterpreter`` ``setUnregisterInterpreter`` were used to set the Interpreters. More documentation for this is coming in the future.

#### addEventListener

This function adds an event listener. It has the same structure as in the DOM.

```js
listener.addEventListener("click", function(event) {
    // Code
});
```

#### removeEventListener

This function removes an event listener. It has the same structure as in the DOM.

```js
listener.removeEventListener("click", listener);
```

#### unload

Resets the object and unloads all listeners.

### ElementListener

This is the [Basic Listener](#basiclistener) with interpreter functions. It is useable and can be constructed normally with the element as parameter.

```js
const elementListener = new Virtual.ElementListener(htmlElement);
```

``ElementListener`` is extending the functions from listener, so all functions from [Basic Listener](#basiclistener) are also available here.

### ListenerLauncher

This is an object that can hold any types of [Listeners](#basiclistener). It checks if an object already has an event listener and when not, it creates a new one. The type of listener must be specified at creation, else the process will fail. The creation elements can be accessed in ``Virtual.ListenerLauncherItem``.

```js
const launcher = new Virtual.ListenerLauncher(Virtual.ListenerLauncherItem.ElementListenerCreation);
// Creates a listener launcher for html elements
```

#### ListenerLauncher.for

This will return a [Listener](#basiclistener) for an object. If noone was created, it will construct a new one.

Example:

```js
launcher.for(htmlElement)/* ElementListener */.addEventListener("click", function() {
    // Code
});
```

The last piece of code is from the [ElementListener](#elementlistener). This is the part where things get to work. [Listeners](#basiclistener) can also work without the ``Launcher`` but they wouldn't be connected anymore (It is important for [Virtual.Site](#site)).

### Loader

The ``Loader`` is a configurable Element that manages the different loading procedures. It works with functions that were passed at construct time. The [load-elements](#loadelement) are accessible in the namespace ``Virtual.LoaderItem``.

Here is an example how to construct the ``Loader`` with the Script loader function:

```js
const scriptLoader = new Virtual.Loader(Virtual.LoaderItem.Script);
```

and here an example with the styleLoader

```js
const styleLoader = new Virtual.Loader(Virtual.LoaderItem.Style);
```

It is important to keep the [LoadElement define](#loadelement) when building own objects.

*(All elements are only accessible with constructed object)*

#### Loader.loadItem

Loads paths and returns a ``boolean`` if path has loaded or not.

Example:

```js
const scriptLoader = new Virtual.Loader(Virtual.LoaderItem.Script);
/* ------------------------- */

const success = scriptLoader.loadItem("script.js");
// success === true = script loaded
```

#### Loader.unloadItem

Unloads a path or element and returns a boolean if path successfully unloaded.

Example:

```js
const scriptLoader = new Virtual.Loader(Virtual.LoaderItem.Script);
/* ------------------------- */

const success = scriptLoader.unloadItem("script.js");
// success === true = script unloaded
```

#### Loader.unload

Unloads all scripts and returns a boolean if paths were successfully unloaded.

Example:

```js
const succces = loader.unload();
```

## Types

### Site

```ts
class Virtual {
    static Site = Site;
}
```

#### EnvironmentFunction

```ts
type EnvironmentFunction = ($: Tool) => any | boolean;
```

#### SiteConstructOptions

```ts
export interface SiteConstructOptions {
    predefinedClasses: boolean;
}
```

### Loader

#### LoadElement

```ts
export interface LoadElement<T> {
    load: LoadFunction<T>;
    unload: UnloadFunction<T>;
}
```
[LoadFunction](#loadfunction) | [UnloadFunction](#unloadfunction)

#### LoadFunction

```ts
export type LoadFunction<R> = (path: string, callback: LoadCallback<R>) => any;
```
[LoadCallback](#loadcallback)

#### UnloadFunction

```ts
export type UnloadFunction<R> = (path: string, object: R) => boolean;
```

#### LoadCallback

```ts
export type LoadCallback<P> = (object: P) => any|boolean;
```