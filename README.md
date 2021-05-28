# Spaghettify
[![GitHub license](https://img.shields.io/github/license/deeleman/spaghettify.svg)](https://github.com/deeleman/spaghettify/blob/master/LICENSE)
[![GitHub version](https://badge.fury.io/gh/deeleman%2Fspaghettify.svg)](https://github.com/deeleman/spaghettify)

Spaghettify is a personal project aimed to implement a DOM interceptor and _middleware-funneling processor_ that turns any static web site into a XHR driven Single Page Application. 

The business logic is pretty straightforward: A `Spaghettify` instance object will intercept all your website links and every time the end user clicks on an eligible link, Spaghettify will spin up a functional reactive stream that will process the request payload, composing a final fully fleshed out DOM snapshot, featuring all necessary transformations. In order to achieve this goal the `Spaghettify` underlying mechanism streams the payload through an extendable row of pluggable I/O middleware functions, each one observing the [Single Responsibility Principle](http://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) and digesting the input stream before passing it over to the next stage in the pipeline.

These middleware handlers can be categorized into `onBeforeComplete` middleware hooks, which DO NOT mutate the current page DOM, and `onAfterComplete` middleware hooks that do apply their changes (hence mutate) directly on the current page DOM.

The entire project is built on top of TypeScript and implements several polyfills and coding strategies to extend support to old legacy browsers, such as MSIE11.

## Setting up your environment
The minimum requirements for running this project, either on development or production mode, and its development scripts are `node v12.16.0` and `npm v.6.14.15`, or later versions. Probably this project will run smoothly on older versions of `node` and `npm` but we recommend using the latest [LTS versions](https://nodejs.org/).

This project relies on [BabelJS](https://babeljs.io/) and [Webpack](https://https://webpack.js.org//) for compiling code in dev mode, running builds serve the demo site files and handling code optimisations.

All interaction with `BabelJS` and `Webpack` has been abstracted away in custom npm scripts for your convenience. 

### Installing dependencies
As a first step to spawn a development environment or production build, please run either `yarn` or `npm install` to pull all the required dependencies for this project.


## Building the project for production
Please execute `yarn build` or `npm run build` from your terminal window. 

Parcel will navigate through the entire application tree and will build the JavaScript artifact into the `/dist` folder.

## Firing up a development environment
You can spawn a development environment by running `yarn dev` or `npm run dev` in the console.

The system will generate all the artifacts and serve the sandbox site (more details below) from http://localhost:3000 (or any other port if 3000 is unavailable - please kindly check the terminal output for further details) in _watch mode_, so the application will be recompiled upon changes in the source code.

### The sandbox site
The sandbox site is a small, uber-simplistic web application that serves as a playground and testing arena for debugging Spaghettify in a live environment. It features a pretty simplistic styling, through a set of different, hierarchical pages depicting the following key features:

- The main `index.html` contains an instance of Spaghettify inline for demo purposes. All the other documents implement such instance as an imported script. This allows to fire up Spaghettify from any document for demo purposes. In a real production scenario, Spaghettify can (and should) be imported and instantiated only once in the entry location.
- Links to Page B are configured to bypass Spaghettify and force a full page load.
- Content is scattered in between the `/sandbox` root level and a child `/sandbox/content` subfolder so contributors can play around with link selectors pointing to subfolders, if necessary.
- The main body contains dummy text with slight variations to ensure the page transition is noticeable.
- The side menu contains diverse input controls to validate state persistence accross navigated pages.
- Page A and pages within `/sandbox/content` feature either inline or imported custom JavaScript that Spaghettify will kindly digest.
- Spaghettify supports forward and backwards history navigation. Browse around and give it a shot!



## The Spaghettify API

You can instantiate and interact with Spaghettify through a convenient API catering with global toggles, route interceptors, exclusions and state persistence attribute flags and, last but not least, loading progress indicators and handlers.

Once you successfully compile Spaghettify, you can import and instantiate it into your application as follows:

```html
<script type="text/javascript" src="/dist/index.js"></script>
<script type="text/javascript">
  new Spaghettify({
    enabled: true,
    routes: ['*.html', 'content/*'],
    excludeByAttr: 'no-spa',
    loadProgress: true,
    persistAttr: 'data-persist',
  });
</script>
```

As you can see Spaghettify will expect a configuration object upon instantiation. Please note that **all fields are optional**. 

### The Spaghettify settings API

The Spaghettify configuration settings object can be summarised as follows:


|Field|Type|Default|Description|
|---|---|---|---|
|`enabled`|`Boolean`|`true`|Enables or disables Spaghettify upon instantiation|
|`routes`|`String[]`|`['*']`|Defines patterns for routes to be intercepted and served through Spaghettify. Supports glob tokens.|
|`excludeByAttr`|`String`|`undefined`|Defines an exclusion data attribute token (with or without the `data-` prefix). Links decorated with this attribute will be bypassed by Spaghettify|
|`loadProgress`|`Boolean` `Function`|`false`|Enables a built-in progress bar or not. It can also take a function handler that will receive a percentage progress integer upon load. |
|`persistAttr`|`String`|`undefined`|**Still in alpha state.** Defines an UI state persistence flag data attribute (with or without the `data-` prefix). Elements decorated with this attribute will persist their state across page navigation.  |

Please note that all configuration options are optional and will take the default value if not explicitly declared.

### Tip: Excluding links from being intercepted by Spaghettify
All links are configured by Spaghettify as subject to be intercepted. Then the internal events manager machinery will assess whether the link is eligible to be treated as an AJAX request or not by testing the link href value against the `routes` glob tokens.

However, we can bypass this step upfront by configuring the `excludeByAttr` option with an attribute value, either with the `data-` prefix or not. 

Nonetheless, and for the sake of semantics, Spaghettify will then only consider link elements configured with the full fledged attribute.

```html
<script type="text/javascript">
  new Spaghettify({
    excludeByAttr: 'skip-me',
  });
</script>

<!-- Spaghettify will disregard the following link -->
<a href="foo.html" data-skip-me>Skip this link</a>
```

The configured attribute can be populated with any value or none at all. Spaghettify will disregard that value anyways.

### Tip: Configuring custom load handlers

As we already learned above, the `loadProgress` configuration option can take a `Boolean` primitive value or a _function handler_.

```html
<script type="text/javascript">
  new Spaghettify({
    loadProgress: true,
  });
</script>
```

If not explicitly configured, or set to `false`, no progress bar indicator will be displayed. If provided as `true`, Spaghettify will show an animated red progress bar indicator on top of the viewport. The progress bar shows the actual download progress.

However, consumers might want to implement their own visual solutions for rendering progress bar information. Spaghettify gets them covered by providing a load progress handler that will expect an integer value parameter in its signature, which will take values from `0` to `100` as pages are requested and downloaded via HXR.

```html
<script type="text/javascript">
  new Spaghettify({
    loadProgress: function onLoad(progress) {
      console.log(progress); // Will log values from 0 to 100
    },
  });
</script>
```

### Tip: Persisting state across navigation

Spaghettify implements an experimental API for persisting state in selected, annotated DOM nodes across page navigation. In order to do so you just need to configure a value token in the `persistAttr` option and then annotate those DOM elements whose state you want to be persisted with the equivalent `data-` attribute with an unique value each:

```html
<script type="text/javascript">
  new Spaghettify({
    persistAttr: 'persist-id',
  });
</script>

<input type="text" data-persist-id="my-input" />
```

You can explicitly prefix the value with `data-` or not, but Spaghettify will require you to annotate the DOM elements to be persisted with the full data attribute syntax.

**Please note**: Attribute values are meant to be unique. Spaghettify will throw an exception if more than one element of different type is configured with the same attribute value.

It is worth highlighting that persistence will be applied on a full DOM `Node` basis, so it will encompass not only the element's inner HTML but also the native _touched_ state for input controls. And all this irrespective of the changes in the outer HTML.

## Testing and linting your code contributions

At the time of this writing, test coverage has not been implemented and linting is currently disabled. Please check back for updates shortly.

## Distributed under the MIT License

Copyright 2021 Pablo Deeleman

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.