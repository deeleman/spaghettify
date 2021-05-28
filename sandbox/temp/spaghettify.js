/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var Spaghettify;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/events-listener/events-listener.ts":
/*!*****************************************************!*\
  !*** ./src/core/events-listener/events-listener.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventsListener\": () => (/* binding */ EventsListener)\n/* harmony export */ });\n/**  */\n\n/** */\n\n/**  */\nclass EventsListener {\n  elementEventListeners = [];\n  eventCallbacks = [];\n\n  constructor(settings) {\n    this.settings = settings;\n    this.attachListeners(settings.element);\n  }\n  /**\n   * \n   */\n\n\n  attachListeners(body) {\n    const elements = body.querySelectorAll(this.settings.selector);\n    elements.forEach(element => {\n      const listener = event => {\n        this.eventHandler(element, event);\n      };\n\n      element.addEventListener(this.settings.elementEvent, listener);\n      this.elementEventListeners.push({\n        element,\n        listener\n      });\n    });\n  }\n  /**\n   * \n   * @param eventHandler \n   */\n\n\n  onEvent(eventHandler) {\n    this.eventCallbacks.push(eventHandler.bind(eventHandler));\n  }\n  /**\n   * \n   */\n\n\n  detachListeners() {\n    this.elementEventListeners.forEach(({\n      element,\n      listener\n    }) => {\n      element.removeEventListener(this.settings.elementEvent, listener);\n    });\n  }\n\n  eventHandler(element, event) {\n    this.eventCallbacks.forEach(eventHandler => eventHandler(element, event));\n  }\n\n}\n\n//# sourceURL=webpack://Spaghettify/./src/core/events-listener/events-listener.ts?");

/***/ }),

/***/ "./src/core/events-listener/events-listener.types.ts":
/*!***********************************************************!*\
  !*** ./src/core/events-listener/events-listener.types.ts ***!
  \***********************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://Spaghettify/./src/core/events-listener/events-listener.types.ts?");

/***/ }),

/***/ "./src/core/events-listener/index.ts":
/*!*******************************************!*\
  !*** ./src/core/events-listener/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventsListener\": () => (/* reexport safe */ _events_listener__WEBPACK_IMPORTED_MODULE_0__.EventsListener)\n/* harmony export */ });\n/* harmony import */ var _events_listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events-listener */ \"./src/core/events-listener/events-listener.ts\");\n/* harmony import */ var _events_listener_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events-listener.types */ \"./src/core/events-listener/events-listener.types.ts\");\n/* harmony import */ var _events_listener_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_events_listener_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _events_listener_types__WEBPACK_IMPORTED_MODULE_1__) if([\"default\",\"EventsListener\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _events_listener_types__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n\n//# sourceURL=webpack://Spaghettify/./src/core/events-listener/index.ts?");

/***/ }),

/***/ "./src/core/http-client/http-client.ts":
/*!*********************************************!*\
  !*** ./src/core/http-client/http-client.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"httpClient\": () => (/* binding */ httpClient)\n/* harmony export */ });\n/**\n * @description\n * General purpose network client for scraping content from a given URL with\n * extended support for typed responses.\n * @param url URL of remote resource\n * @param options \n * @returns Typed promise with response output, featuring error handling functionality\n */\nconst httpClient = async (url, options) => {\n  // Initialize request\n  const response = await fetch(url); // Spin up a binary stream reader and declare tracking tokens so we can keep track of HTTP GET download progress\n\n  const streamReader = response.body.getReader();\n  const binaryBodyChunks = [];\n  const contentLength = +(response.headers.get('Content-Length') || 0); // Total length\n\n  let receivedContentLength = 0; // Runs a tick-based loop to iteratively read stream progress\n\n  while (true) {\n    const {\n      done,\n      value\n    } = await streamReader.read();\n\n    if (done) {\n      break;\n    }\n\n    binaryBodyChunks.push(value);\n    receivedContentLength += value !== void 0 ? value.length : 0;\n\n    if ((options === null || options === void 0 ? void 0 : options.onLoadProgress) !== void 0) {\n      options.onLoadProgress(Math.floor(receivedContentLength / contentLength * 100));\n    }\n  } // Recompile chunks into a single Uint8Array\n\n\n  const uint8Array = new Uint8Array(receivedContentLength);\n  let position = 0;\n\n  for (let binaryBodyChunk of binaryBodyChunks) {\n    uint8Array.set(binaryBodyChunk, position); // (4.2)\n\n    position += binaryBodyChunk ? binaryBodyChunk.length : 0;\n  } // Decode recompiled binary array into plain string and return results\n\n\n  const responseText = new TextDecoder(\"utf-8\").decode(uint8Array);\n\n  if ((options === null || options === void 0 ? void 0 : options.serializer) !== void 0) {\n    return options.serializer(responseText);\n  }\n\n  return responseText;\n};\n\n//# sourceURL=webpack://Spaghettify/./src/core/http-client/http-client.ts?");

/***/ }),

/***/ "./src/core/http-client/index.ts":
/*!***************************************!*\
  !*** ./src/core/http-client/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"httpClient\": () => (/* reexport safe */ _http_client__WEBPACK_IMPORTED_MODULE_0__.httpClient)\n/* harmony export */ });\n/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http-client */ \"./src/core/http-client/http-client.ts\");\n\n\n//# sourceURL=webpack://Spaghettify/./src/core/http-client/index.ts?");

/***/ }),

/***/ "./src/core/index.ts":
/*!***************************!*\
  !*** ./src/core/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"httpClient\": () => (/* reexport safe */ _http_client__WEBPACK_IMPORTED_MODULE_1__.httpClient)\n/* harmony export */ });\n/* harmony import */ var _events_listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events-listener */ \"./src/core/events-listener/index.ts\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _events_listener__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _events_listener__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http-client */ \"./src/core/http-client/index.ts\");\n/* harmony import */ var _progress_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./progress-bar */ \"./src/core/progress-bar/index.ts\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _progress_bar__WEBPACK_IMPORTED_MODULE_2__) if([\"default\",\"EventsListener\",\"httpClient\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _progress_bar__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _stream_writer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream-writer */ \"./src/core/stream-writer/index.ts\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _stream_writer__WEBPACK_IMPORTED_MODULE_3__) if([\"default\",\"EventsListener\",\"httpClient\",\"PROGRESS_BAR_TRANSITION_MS\",\"progressBarHandler\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _stream_writer__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n\n\n\n//# sourceURL=webpack://Spaghettify/./src/core/index.ts?");

/***/ }),

/***/ "./src/core/polyfills/index.ts":
/*!*************************************!*\
  !*** ./src/core/polyfills/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var promise_polyfill_src_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! promise-polyfill/src/polyfill */ \"./node_modules/promise-polyfill/src/polyfill.js\");\n/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! whatwg-fetch */ \"./node_modules/whatwg-fetch/fetch.js\");\n\n\n\n//# sourceURL=webpack://Spaghettify/./src/core/polyfills/index.ts?");

/***/ }),

/***/ "./src/core/progress-bar/index.ts":
/*!****************************************!*\
  !*** ./src/core/progress-bar/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PROGRESS_BAR_TRANSITION_MS\": () => (/* reexport safe */ _progress_bar_handler__WEBPACK_IMPORTED_MODULE_0__.PROGRESS_BAR_TRANSITION_MS),\n/* harmony export */   \"progressBarHandler\": () => (/* reexport safe */ _progress_bar_handler__WEBPACK_IMPORTED_MODULE_0__.progressBarHandler)\n/* harmony export */ });\n/* harmony import */ var _progress_bar_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress-bar-handler */ \"./src/core/progress-bar/progress-bar-handler.ts\");\n/* harmony import */ var _progress_bar_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress-bar.types */ \"./src/core/progress-bar/progress-bar.types.ts\");\n/* harmony import */ var _progress_bar_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_progress_bar_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _progress_bar_types__WEBPACK_IMPORTED_MODULE_1__) if([\"default\",\"PROGRESS_BAR_TRANSITION_MS\",\"progressBarHandler\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _progress_bar_types__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n\n//# sourceURL=webpack://Spaghettify/./src/core/progress-bar/index.ts?");

/***/ }),

/***/ "./src/core/progress-bar/progress-bar-handler.ts":
/*!*******************************************************!*\
  !*** ./src/core/progress-bar/progress-bar-handler.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PROGRESS_BAR_TRANSITION_MS\": () => (/* binding */ PROGRESS_BAR_TRANSITION_MS),\n/* harmony export */   \"progressBarHandler\": () => (/* binding */ progressBarHandler)\n/* harmony export */ });\nconst PROGRESS_BAR_TRANSITION_MS = 200;\n\nconst generateProgressBar = document => {\n  const divElement = document.createElement('div');\n  divElement.id = '__spaghettifyProgressBar';\n  divElement.style.position = 'fixed';\n  divElement.style.top = '0';\n  divElement.style.left = '0';\n  divElement.style.width = '0%';\n  divElement.style.height = '3px';\n  divElement.style.transitionProperty = 'width';\n  divElement.style.transitionDuration = `${PROGRESS_BAR_TRANSITION_MS / 1000}s`;\n  divElement.style.backgroundColor = '#c90000';\n  document.body.appendChild(divElement);\n  return divElement;\n};\n\nconst progressBarHandler = (document, loadProgress) => {\n  if (loadProgress === void 0 || loadProgress === false) {\n    return;\n  }\n\n  let progressBarElement;\n\n  const builtinLoadProgressHandler = loadProgress => {\n    if (loadProgress === 0) {\n      progressBarElement = generateProgressBar(document);\n    }\n\n    progressBarElement.style.width = `${loadProgress}%`;\n\n    if (loadProgress === 100) {\n      setTimeout(() => {\n        progressBarElement.remove();\n      }, PROGRESS_BAR_TRANSITION_MS - 1);\n    }\n  };\n\n  return typeof loadProgress === 'boolean' ? builtinLoadProgressHandler : loadProgress;\n};\n\n//# sourceURL=webpack://Spaghettify/./src/core/progress-bar/progress-bar-handler.ts?");

/***/ }),

/***/ "./src/core/progress-bar/progress-bar.types.ts":
/*!*****************************************************!*\
  !*** ./src/core/progress-bar/progress-bar.types.ts ***!
  \*****************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://Spaghettify/./src/core/progress-bar/progress-bar.types.ts?");

/***/ }),

/***/ "./src/core/stream-writer/index.ts":
/*!*****************************************!*\
  !*** ./src/core/stream-writer/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StreamWriter\": () => (/* reexport safe */ _stream_writer__WEBPACK_IMPORTED_MODULE_0__.StreamWriter)\n/* harmony export */ });\n/* harmony import */ var _stream_writer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stream-writer */ \"./src/core/stream-writer/stream-writer.ts\");\n/* harmony import */ var _stream_writer_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stream-writer.types */ \"./src/core/stream-writer/stream-writer.types.ts\");\n/* harmony import */ var _stream_writer_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stream_writer_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _stream_writer_types__WEBPACK_IMPORTED_MODULE_1__) if([\"default\",\"StreamWriter\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _stream_writer_types__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n\n\n\n//# sourceURL=webpack://Spaghettify/./src/core/stream-writer/index.ts?");

/***/ }),

/***/ "./src/core/stream-writer/stream-writer.ts":
/*!*************************************************!*\
  !*** ./src/core/stream-writer/stream-writer.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StreamWriter\": () => (/* binding */ StreamWriter)\n/* harmony export */ });\n/** */\nclass StreamWriter {\n  streamCompleteCallbacks = [];\n\n  constructor(streamWriterHooks) {\n    this.streamWriterHooks = streamWriterHooks;\n  }\n  /**\n   * \n   * @param streamCompleteCallback \n   */\n\n\n  onComplete(streamCompleteCallback) {\n    this.streamCompleteCallbacks.push(streamCompleteCallback);\n  }\n  /**\n   * \n   * @param payload \n   */\n\n\n  async pipe(payload) {\n    let streamPayload = await this.processMiddleware(payload, this.streamWriterHooks.onBeforeComplete);\n\n    if (streamPayload !== void 0) {\n      this.streamCompleteCallbacks.forEach(streamCompleteCallback => streamCompleteCallback(streamPayload));\n      await this.processMiddleware(streamPayload, this.streamWriterHooks.onAfterComplete);\n    }\n  }\n\n  async processMiddleware(payload, middlewareHandlers) {\n    let streamPayload = { ...payload\n    }; // Ensures Immutability\n\n    for (const middlewareHandler of middlewareHandlers) {\n      streamPayload = await middlewareHandler(streamPayload);\n\n      if (streamPayload === void 0) {\n        break;\n      }\n    }\n\n    return streamPayload;\n  }\n\n}\n\n//# sourceURL=webpack://Spaghettify/./src/core/stream-writer/stream-writer.ts?");

/***/ }),

/***/ "./src/core/stream-writer/stream-writer.types.ts":
/*!*******************************************************!*\
  !*** ./src/core/stream-writer/stream-writer.types.ts ***!
  \*******************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://Spaghettify/./src/core/stream-writer/stream-writer.types.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Spaghettify\": () => (/* reexport safe */ _spaghettify__WEBPACK_IMPORTED_MODULE_0__.Spaghettify)\n/* harmony export */ });\n/* harmony import */ var _spaghettify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spaghettify */ \"./src/spaghettify.ts\");\n\n\nObject.defineProperty(window, 'Spaghettify', {\n  writable: false,\n  enumerable: true,\n  configurable: false,\n  value: _spaghettify__WEBPACK_IMPORTED_MODULE_0__.Spaghettify\n});\n\n//# sourceURL=webpack://Spaghettify/./src/index.ts?");

/***/ }),

/***/ "./src/middleware/dom-persistence-manager/dom-persistence-manager.ts":
/*!***************************************************************************!*\
  !*** ./src/middleware/dom-persistence-manager/dom-persistence-manager.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMPersistenceManager\": () => (/* binding */ DOMPersistenceManager)\n/* harmony export */ });\nconst persistedElementsMap = new Map();\n\nconst persistElements = (targetElement, persistAttr) => {\n  const elementsToPersist = targetElement.querySelectorAll(`*[${persistAttr}]`);\n  elementsToPersist.forEach(element => {\n    const elementPersistenceKey = element.getAttribute(persistAttr);\n\n    if (persistedElementsMap.has(elementPersistenceKey)) {\n      const persistedElement = persistedElementsMap.get(elementPersistenceKey);\n\n      if (persistedElement !== void 0 && persistedElement.nodeType !== element.nodeType) {\n        throw new Error(`There is more than one element with the \"${persistAttr}\" data attribute set to \"${elementPersistenceKey}\"\".`);\n      }\n\n      element.replaceWith(persistedElement);\n    } else {\n      persistedElementsMap.set(elementPersistenceKey, element);\n    }\n  });\n};\n\nconst DOMPersistenceManager = (body, persistAttribute = 'no-persist') => {\n  const sanitizedPersistAttr = persistAttribute !== null && persistAttribute !== void 0 && persistAttribute.startsWith('data-') ? persistAttribute : `data-${persistAttribute}`;\n  persistElements(body, sanitizedPersistAttr);\n  return payload => {\n    persistElements(payload.data, sanitizedPersistAttr);\n    return payload;\n  };\n};\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/dom-persistence-manager/dom-persistence-manager.ts?");

/***/ }),

/***/ "./src/middleware/dom-persistence-manager/index.ts":
/*!*********************************************************!*\
  !*** ./src/middleware/dom-persistence-manager/index.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMPersistenceManager\": () => (/* reexport safe */ _dom_persistence_manager__WEBPACK_IMPORTED_MODULE_0__.DOMPersistenceManager)\n/* harmony export */ });\n/* harmony import */ var _dom_persistence_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-persistence-manager */ \"./src/middleware/dom-persistence-manager/dom-persistence-manager.ts\");\n\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/dom-persistence-manager/index.ts?");

/***/ }),

/***/ "./src/middleware/dom-scripts-parser/dom-scripts-parser.ts":
/*!*****************************************************************!*\
  !*** ./src/middleware/dom-scripts-parser/dom-scripts-parser.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMScriptsParser\": () => (/* binding */ DOMScriptsParser)\n/* harmony export */ });\n/** */\nconst DOMScriptsParser = () => {\n  const parseScriptNodes = element => {\n    return element.querySelectorAll('script');\n  };\n\n  return payload => {\n    const documentBody = payload.data;\n    const scriptElementNodeList = parseScriptNodes(documentBody);\n    const scriptElements = [];\n    scriptElementNodeList.forEach(scriptElement => {\n      var _payload$rawData;\n\n      const childScriptElement = (_payload$rawData = payload.rawData) === null || _payload$rawData === void 0 ? void 0 : _payload$rawData.createElement('script');\n      childScriptElement.type = 'text/javascript';\n\n      if (scriptElement.src) {\n        childScriptElement.src = scriptElement.src;\n      } else {\n        childScriptElement.insertAdjacentText('afterbegin', scriptElement.innerText);\n      }\n\n      scriptElement.remove();\n      scriptElements.push(childScriptElement);\n    });\n    scriptElements === null || scriptElements === void 0 ? void 0 : scriptElements.forEach(scriptElement => payload.data.appendChild(scriptElement));\n    return payload;\n  };\n};\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/dom-scripts-parser/dom-scripts-parser.ts?");

/***/ }),

/***/ "./src/middleware/dom-scripts-parser/index.ts":
/*!****************************************************!*\
  !*** ./src/middleware/dom-scripts-parser/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMScriptsParser\": () => (/* reexport safe */ _dom_scripts_parser__WEBPACK_IMPORTED_MODULE_0__.DOMScriptsParser)\n/* harmony export */ });\n/* harmony import */ var _dom_scripts_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-scripts-parser */ \"./src/middleware/dom-scripts-parser/dom-scripts-parser.ts\");\n\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/dom-scripts-parser/index.ts?");

/***/ }),

/***/ "./src/middleware/history-handler/history-entry-list.ts":
/*!**************************************************************!*\
  !*** ./src/middleware/history-handler/history-entry-list.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HistoryEntryList\": () => (/* binding */ HistoryEntryList)\n/* harmony export */ });\nclass HistoryEntryList {\n  constructor(window) {\n    const title = window.document.title;\n    const href = window.location.href;\n    const visitedOn = Date.now();\n    this.head = {\n      href,\n      title,\n      visitedOn,\n      payload: {\n        data: window.document.body\n      }\n    };\n    this.replaceHead(this.head);\n  }\n\n  replaceHead(node) {\n    node.prev = this.head;\n    this.head.next = node;\n    this.head = node;\n    return node;\n  }\n\n  retrieveHistoryEntry(eventState) {\n    const {\n      visitedOn\n    } = eventState;\n\n    if (this.head.visitedOn > visitedOn && this.head.prev) {\n      this.head = this.head.prev;\n    } else if (this.head.visitedOn < visitedOn && this.head.next) {\n      this.head = this.head.next;\n    }\n\n    return this.head;\n  }\n\n}\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/history-handler/history-entry-list.ts?");

/***/ }),

/***/ "./src/middleware/history-handler/history-handler.ts":
/*!***********************************************************!*\
  !*** ./src/middleware/history-handler/history-handler.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"historyHandler\": () => (/* binding */ historyHandler)\n/* harmony export */ });\n/* harmony import */ var _history_entry_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history-entry-list */ \"./src/middleware/history-handler/history-entry-list.ts\");\n\nconst historyHandler = window => {\n  const historyEntries = new _history_entry_list__WEBPACK_IMPORTED_MODULE_0__.HistoryEntryList(window);\n  const {\n    href,\n    visitedOn,\n    title\n  } = historyEntries.head;\n  window.history.replaceState({\n    visitedOn\n  }, title || '', href);\n\n  const onPopState = event => {\n    const historyEntry = historyEntries.retrieveHistoryEntry(event.state);\n    window.document.body = historyEntry.payload.data;\n  };\n\n  window.addEventListener('popstate', onPopState);\n  window.addEventListener('beforeunload', () => {\n    window.removeEventListener('popstate', onPopState);\n  });\n  return payload => {\n    var _payload$rawData;\n\n    const title = ((_payload$rawData = payload.rawData) === null || _payload$rawData === void 0 ? void 0 : _payload$rawData.title) || '';\n    const href = payload.anchor.href;\n    const visitedOn = Date.now();\n    historyEntries.replaceHead({\n      payload,\n      href,\n      title,\n      visitedOn\n    });\n    window.history.pushState({\n      visitedOn\n    }, title, href);\n    return payload;\n  };\n};\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/history-handler/history-handler.ts?");

/***/ }),

/***/ "./src/middleware/history-handler/index.ts":
/*!*************************************************!*\
  !*** ./src/middleware/history-handler/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"historyHandler\": () => (/* reexport safe */ _history_handler__WEBPACK_IMPORTED_MODULE_0__.historyHandler)\n/* harmony export */ });\n/* harmony import */ var _history_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history-handler */ \"./src/middleware/history-handler/history-handler.ts\");\n\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/history-handler/index.ts?");

/***/ }),

/***/ "./src/middleware/index.ts":
/*!*********************************!*\
  !*** ./src/middleware/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DOMPersistenceManager\": () => (/* reexport safe */ _dom_persistence_manager__WEBPACK_IMPORTED_MODULE_0__.DOMPersistenceManager),\n/* harmony export */   \"DOMScriptsParser\": () => (/* reexport safe */ _dom_scripts_parser__WEBPACK_IMPORTED_MODULE_1__.DOMScriptsParser),\n/* harmony export */   \"historyHandler\": () => (/* reexport safe */ _history_handler__WEBPACK_IMPORTED_MODULE_2__.historyHandler),\n/* harmony export */   \"linkInterceptor\": () => (/* reexport safe */ _link_interceptor__WEBPACK_IMPORTED_MODULE_3__.linkInterceptor),\n/* harmony export */   \"webScraper\": () => (/* reexport safe */ _web_scraper__WEBPACK_IMPORTED_MODULE_4__.webScraper)\n/* harmony export */ });\n/* harmony import */ var _dom_persistence_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-persistence-manager */ \"./src/middleware/dom-persistence-manager/index.ts\");\n/* harmony import */ var _dom_scripts_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-scripts-parser */ \"./src/middleware/dom-scripts-parser/index.ts\");\n/* harmony import */ var _history_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./history-handler */ \"./src/middleware/history-handler/index.ts\");\n/* harmony import */ var _link_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./link-interceptor */ \"./src/middleware/link-interceptor/index.ts\");\n/* harmony import */ var _web_scraper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-scraper */ \"./src/middleware/web-scraper/index.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/index.ts?");

/***/ }),

/***/ "./src/middleware/link-interceptor/index.ts":
/*!**************************************************!*\
  !*** ./src/middleware/link-interceptor/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"linkInterceptor\": () => (/* reexport safe */ _link_interceptor__WEBPACK_IMPORTED_MODULE_0__.linkInterceptor)\n/* harmony export */ });\n/* harmony import */ var _link_interceptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./link-interceptor */ \"./src/middleware/link-interceptor/link-interceptor.ts\");\n\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/link-interceptor/index.ts?");

/***/ }),

/***/ "./src/middleware/link-interceptor/link-interceptor.ts":
/*!*************************************************************!*\
  !*** ./src/middleware/link-interceptor/link-interceptor.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"linkInterceptor\": () => (/* binding */ linkInterceptor)\n/* harmony export */ });\n/**  */\nconst linkInterceptor = routes => {\n  const routeRegexPattern = routes.join('|').replace(/\\//g, '\\\\/').replace(/\\./g, '\\\\.').replace(/\\+/g, '\\\\+').replace(/\\?/g, '\\\\?').replace(/\\*+/g, '.?');\n  const routeRegex = new RegExp(routeRegexPattern, 'i');\n  return payload => {\n    const isEligibleAnchor = routeRegex.test(payload.anchor.href);\n\n    if (isEligibleAnchor) {\n      payload.event.preventDefault();\n    }\n\n    return isEligibleAnchor ? payload : void 0;\n  };\n};\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/link-interceptor/link-interceptor.ts?");

/***/ }),

/***/ "./src/middleware/web-scraper/index.ts":
/*!*********************************************!*\
  !*** ./src/middleware/web-scraper/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"webScraper\": () => (/* reexport safe */ _web_scraper__WEBPACK_IMPORTED_MODULE_0__.webScraper)\n/* harmony export */ });\n/* harmony import */ var _web_scraper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web-scraper */ \"./src/middleware/web-scraper/web-scraper.ts\");\n\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/web-scraper/index.ts?");

/***/ }),

/***/ "./src/middleware/web-scraper/web-scraper.ts":
/*!***************************************************!*\
  !*** ./src/middleware/web-scraper/web-scraper.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"webScraper\": () => (/* binding */ webScraper)\n/* harmony export */ });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ \"./src/core/index.ts\");\n\n/**\n * \n * @param onLoadProgress \n * @returns \n */\n\nconst webScraper = onLoadProgress => {\n  const responseDOMParser = new DOMParser();\n\n  const serializer = responseText => responseDOMParser.parseFromString(responseText, 'text/html');\n\n  return async payload => {\n    const {\n      href\n    } = payload.anchor;\n\n    if (onLoadProgress !== void 0) {\n      onLoadProgress(0);\n    }\n\n    const scrapedPageDOM = await (0,_core__WEBPACK_IMPORTED_MODULE_0__.httpClient)(href, {\n      serializer,\n      onLoadProgress\n    }); // If onLoadProgress is provided, middleware finalization is deferred to next transition tick to ensure full progress bar rendering\n\n    const deferRate = onLoadProgress !== void 0 ? _core__WEBPACK_IMPORTED_MODULE_0__.PROGRESS_BAR_TRANSITION_MS : 0;\n    await new Promise(resolve => setTimeout(resolve, deferRate));\n    return { ...payload,\n      rawData: scrapedPageDOM,\n      data: scrapedPageDOM.body\n    };\n  };\n};\n\n//# sourceURL=webpack://Spaghettify/./src/middleware/web-scraper/web-scraper.ts?");

/***/ }),

/***/ "./src/spaghettify.ts":
/*!****************************!*\
  !*** ./src/spaghettify.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Spaghettify\": () => (/* binding */ Spaghettify)\n/* harmony export */ });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./src/core/index.ts\");\n/* harmony import */ var _core_polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/polyfills */ \"./src/core/polyfills/index.ts\");\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware */ \"./src/middleware/index.ts\");\n\n\n\n\n/**\n * \n */\nclass Spaghettify {\n  get anchorSelector() {\n    const exclusionAttr = this.options.excludeByAttr;\n    const sanitizedExclusionAttr = exclusionAttr !== null && exclusionAttr !== void 0 && exclusionAttr.startsWith('data-') ? exclusionAttr : `data-${exclusionAttr}`;\n    return this.options.excludeByAttr ? `a:not([${sanitizedExclusionAttr}])` : 'a';\n  }\n\n  constructor(options) {\n    this.options = options;\n\n    if (this.options.enabled === void 0 || this.options.enabled === true) {\n      document.addEventListener('DOMContentLoaded', () => {\n        this.eventsListener = new _core__WEBPACK_IMPORTED_MODULE_0__.EventsListener({\n          element: document.body,\n          elementEvent: 'click',\n          selector: this.anchorSelector\n        });\n        this.addNavigationRequestListener(this.eventsListener);\n      });\n      window.addEventListener('beforeunload', this.destroy);\n    }\n  }\n\n  destroy() {\n    var _this$eventsListener;\n\n    (_this$eventsListener = this.eventsListener) === null || _this$eventsListener === void 0 ? void 0 : _this$eventsListener.detachListeners();\n  }\n\n  addNavigationRequestListener(eventsListener) {\n    const {\n      routes,\n      loadProgress,\n      persistAttr\n    } = this.options;\n    const onLoadProgressHandler = (0,_core__WEBPACK_IMPORTED_MODULE_0__.progressBarHandler)(document, loadProgress);\n    const onBeforeComplete = [(0,_middleware__WEBPACK_IMPORTED_MODULE_2__.linkInterceptor)(routes || ['*']), (0,_middleware__WEBPACK_IMPORTED_MODULE_2__.webScraper)(onLoadProgressHandler), (0,_middleware__WEBPACK_IMPORTED_MODULE_2__.DOMPersistenceManager)(document.body, persistAttr)];\n    const onAfterComplete = [(0,_middleware__WEBPACK_IMPORTED_MODULE_2__.historyHandler)(window), (0,_middleware__WEBPACK_IMPORTED_MODULE_2__.DOMScriptsParser)()];\n    const streamWriter = new _core__WEBPACK_IMPORTED_MODULE_0__.StreamWriter({\n      onBeforeComplete,\n      onAfterComplete\n    });\n    streamWriter.onComplete(stream => {\n      if (stream !== null && stream !== void 0 && stream.data) {\n        document.body = stream.data;\n        eventsListener.attachListeners(document.body);\n      }\n    });\n    eventsListener.onEvent((anchor, event) => {\n      streamWriter.pipe({\n        anchor,\n        event\n      });\n    });\n  }\n\n}\n\n//# sourceURL=webpack://Spaghettify/./src/spaghettify.ts?");

/***/ }),

/***/ "./node_modules/promise-polyfill/src/allSettled.js":
/*!*********************************************************!*\
  !*** ./node_modules/promise-polyfill/src/allSettled.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction allSettled(arr) {\n  var P = this;\n  return new P(function(resolve, reject) {\n    if (!(arr && typeof arr.length !== 'undefined')) {\n      return reject(\n        new TypeError(\n          typeof arr +\n            ' ' +\n            arr +\n            ' is not iterable(cannot read property Symbol(Symbol.iterator))'\n        )\n      );\n    }\n    var args = Array.prototype.slice.call(arr);\n    if (args.length === 0) return resolve([]);\n    var remaining = args.length;\n\n    function res(i, val) {\n      if (val && (typeof val === 'object' || typeof val === 'function')) {\n        var then = val.then;\n        if (typeof then === 'function') {\n          then.call(\n            val,\n            function(val) {\n              res(i, val);\n            },\n            function(e) {\n              args[i] = { status: 'rejected', reason: e };\n              if (--remaining === 0) {\n                resolve(args);\n              }\n            }\n          );\n          return;\n        }\n      }\n      args[i] = { status: 'fulfilled', value: val };\n      if (--remaining === 0) {\n        resolve(args);\n      }\n    }\n\n    for (var i = 0; i < args.length; i++) {\n      res(i, args[i]);\n    }\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (allSettled);\n\n\n//# sourceURL=webpack://Spaghettify/./node_modules/promise-polyfill/src/allSettled.js?");

/***/ }),

/***/ "./node_modules/promise-polyfill/src/finally.js":
/*!******************************************************!*\
  !*** ./node_modules/promise-polyfill/src/finally.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * @this {Promise}\n */\nfunction finallyConstructor(callback) {\n  var constructor = this.constructor;\n  return this.then(\n    function(value) {\n      // @ts-ignore\n      return constructor.resolve(callback()).then(function() {\n        return value;\n      });\n    },\n    function(reason) {\n      // @ts-ignore\n      return constructor.resolve(callback()).then(function() {\n        // @ts-ignore\n        return constructor.reject(reason);\n      });\n    }\n  );\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (finallyConstructor);\n\n\n//# sourceURL=webpack://Spaghettify/./node_modules/promise-polyfill/src/finally.js?");

/***/ }),

/***/ "./node_modules/promise-polyfill/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/src/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finally */ \"./node_modules/promise-polyfill/src/finally.js\");\n/* harmony import */ var _allSettled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allSettled */ \"./node_modules/promise-polyfill/src/allSettled.js\");\n\n\n\n// Store setTimeout reference so promise-polyfill will be unaffected by\n// other code modifying setTimeout (like sinon.useFakeTimers())\nvar setTimeoutFunc = setTimeout;\n\nfunction isArray(x) {\n  return Boolean(x && typeof x.length !== 'undefined');\n}\n\nfunction noop() {}\n\n// Polyfill for Function.prototype.bind\nfunction bind(fn, thisArg) {\n  return function() {\n    fn.apply(thisArg, arguments);\n  };\n}\n\n/**\n * @constructor\n * @param {Function} fn\n */\nfunction Promise(fn) {\n  if (!(this instanceof Promise))\n    throw new TypeError('Promises must be constructed via new');\n  if (typeof fn !== 'function') throw new TypeError('not a function');\n  /** @type {!number} */\n  this._state = 0;\n  /** @type {!boolean} */\n  this._handled = false;\n  /** @type {Promise|undefined} */\n  this._value = undefined;\n  /** @type {!Array<!Function>} */\n  this._deferreds = [];\n\n  doResolve(fn, this);\n}\n\nfunction handle(self, deferred) {\n  while (self._state === 3) {\n    self = self._value;\n  }\n  if (self._state === 0) {\n    self._deferreds.push(deferred);\n    return;\n  }\n  self._handled = true;\n  Promise._immediateFn(function() {\n    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;\n    if (cb === null) {\n      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);\n      return;\n    }\n    var ret;\n    try {\n      ret = cb(self._value);\n    } catch (e) {\n      reject(deferred.promise, e);\n      return;\n    }\n    resolve(deferred.promise, ret);\n  });\n}\n\nfunction resolve(self, newValue) {\n  try {\n    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure\n    if (newValue === self)\n      throw new TypeError('A promise cannot be resolved with itself.');\n    if (\n      newValue &&\n      (typeof newValue === 'object' || typeof newValue === 'function')\n    ) {\n      var then = newValue.then;\n      if (newValue instanceof Promise) {\n        self._state = 3;\n        self._value = newValue;\n        finale(self);\n        return;\n      } else if (typeof then === 'function') {\n        doResolve(bind(then, newValue), self);\n        return;\n      }\n    }\n    self._state = 1;\n    self._value = newValue;\n    finale(self);\n  } catch (e) {\n    reject(self, e);\n  }\n}\n\nfunction reject(self, newValue) {\n  self._state = 2;\n  self._value = newValue;\n  finale(self);\n}\n\nfunction finale(self) {\n  if (self._state === 2 && self._deferreds.length === 0) {\n    Promise._immediateFn(function() {\n      if (!self._handled) {\n        Promise._unhandledRejectionFn(self._value);\n      }\n    });\n  }\n\n  for (var i = 0, len = self._deferreds.length; i < len; i++) {\n    handle(self, self._deferreds[i]);\n  }\n  self._deferreds = null;\n}\n\n/**\n * @constructor\n */\nfunction Handler(onFulfilled, onRejected, promise) {\n  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;\n  this.onRejected = typeof onRejected === 'function' ? onRejected : null;\n  this.promise = promise;\n}\n\n/**\n * Take a potentially misbehaving resolver function and make sure\n * onFulfilled and onRejected are only called once.\n *\n * Makes no guarantees about asynchrony.\n */\nfunction doResolve(fn, self) {\n  var done = false;\n  try {\n    fn(\n      function(value) {\n        if (done) return;\n        done = true;\n        resolve(self, value);\n      },\n      function(reason) {\n        if (done) return;\n        done = true;\n        reject(self, reason);\n      }\n    );\n  } catch (ex) {\n    if (done) return;\n    done = true;\n    reject(self, ex);\n  }\n}\n\nPromise.prototype['catch'] = function(onRejected) {\n  return this.then(null, onRejected);\n};\n\nPromise.prototype.then = function(onFulfilled, onRejected) {\n  // @ts-ignore\n  var prom = new this.constructor(noop);\n\n  handle(this, new Handler(onFulfilled, onRejected, prom));\n  return prom;\n};\n\nPromise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_0__.default;\n\nPromise.all = function(arr) {\n  return new Promise(function(resolve, reject) {\n    if (!isArray(arr)) {\n      return reject(new TypeError('Promise.all accepts an array'));\n    }\n\n    var args = Array.prototype.slice.call(arr);\n    if (args.length === 0) return resolve([]);\n    var remaining = args.length;\n\n    function res(i, val) {\n      try {\n        if (val && (typeof val === 'object' || typeof val === 'function')) {\n          var then = val.then;\n          if (typeof then === 'function') {\n            then.call(\n              val,\n              function(val) {\n                res(i, val);\n              },\n              reject\n            );\n            return;\n          }\n        }\n        args[i] = val;\n        if (--remaining === 0) {\n          resolve(args);\n        }\n      } catch (ex) {\n        reject(ex);\n      }\n    }\n\n    for (var i = 0; i < args.length; i++) {\n      res(i, args[i]);\n    }\n  });\n};\n\nPromise.allSettled = _allSettled__WEBPACK_IMPORTED_MODULE_1__.default;\n\nPromise.resolve = function(value) {\n  if (value && typeof value === 'object' && value.constructor === Promise) {\n    return value;\n  }\n\n  return new Promise(function(resolve) {\n    resolve(value);\n  });\n};\n\nPromise.reject = function(value) {\n  return new Promise(function(resolve, reject) {\n    reject(value);\n  });\n};\n\nPromise.race = function(arr) {\n  return new Promise(function(resolve, reject) {\n    if (!isArray(arr)) {\n      return reject(new TypeError('Promise.race accepts an array'));\n    }\n\n    for (var i = 0, len = arr.length; i < len; i++) {\n      Promise.resolve(arr[i]).then(resolve, reject);\n    }\n  });\n};\n\n// Use polyfill for setImmediate for performance gains\nPromise._immediateFn =\n  // @ts-ignore\n  (typeof setImmediate === 'function' &&\n    function(fn) {\n      // @ts-ignore\n      setImmediate(fn);\n    }) ||\n  function(fn) {\n    setTimeoutFunc(fn, 0);\n  };\n\nPromise._unhandledRejectionFn = function _unhandledRejectionFn(err) {\n  if (typeof console !== 'undefined' && console) {\n    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Promise);\n\n\n//# sourceURL=webpack://Spaghettify/./node_modules/promise-polyfill/src/index.js?");

/***/ }),

/***/ "./node_modules/promise-polyfill/src/polyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/promise-polyfill/src/polyfill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./node_modules/promise-polyfill/src/index.js\");\n/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./finally */ \"./node_modules/promise-polyfill/src/finally.js\");\n/* harmony import */ var _allSettled__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./allSettled */ \"./node_modules/promise-polyfill/src/allSettled.js\");\n\n\n\n\n/** @suppress {undefinedVars} */\nvar globalNS = (function() {\n  // the only reliable means to get the global object is\n  // `Function('return this')()`\n  // However, this causes CSP violations in Chrome apps.\n  if (typeof self !== 'undefined') {\n    return self;\n  }\n  if (typeof window !== 'undefined') {\n    return window;\n  }\n  if (typeof __webpack_require__.g !== 'undefined') {\n    return __webpack_require__.g;\n  }\n  throw new Error('unable to locate global object');\n})();\n\n// Expose the polyfill if Promise is undefined or set to a\n// non-function value. The latter can be due to a named HTMLElement\n// being exposed by browsers for legacy reasons.\n// https://github.com/taylorhakes/promise-polyfill/issues/114\nif (typeof globalNS['Promise'] !== 'function') {\n  globalNS['Promise'] = _index__WEBPACK_IMPORTED_MODULE_0__.default;\n} else if (!globalNS.Promise.prototype['finally']) {\n  globalNS.Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_1__.default;\n} else if (!globalNS.Promise.allSettled) {\n  globalNS.Promise.allSettled = _allSettled__WEBPACK_IMPORTED_MODULE_2__.default;\n}\n\n\n//# sourceURL=webpack://Spaghettify/./node_modules/promise-polyfill/src/polyfill.js?");

/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Headers\": () => (/* binding */ Headers),\n/* harmony export */   \"Request\": () => (/* binding */ Request),\n/* harmony export */   \"Response\": () => (/* binding */ Response),\n/* harmony export */   \"DOMException\": () => (/* binding */ DOMException),\n/* harmony export */   \"fetch\": () => (/* binding */ fetch)\n/* harmony export */ });\nvar global =\n  (typeof globalThis !== 'undefined' && globalThis) ||\n  (typeof self !== 'undefined' && self) ||\n  (typeof global !== 'undefined' && global)\n\nvar support = {\n  searchParams: 'URLSearchParams' in global,\n  iterable: 'Symbol' in global && 'iterator' in Symbol,\n  blob:\n    'FileReader' in global &&\n    'Blob' in global &&\n    (function() {\n      try {\n        new Blob()\n        return true\n      } catch (e) {\n        return false\n      }\n    })(),\n  formData: 'FormData' in global,\n  arrayBuffer: 'ArrayBuffer' in global\n}\n\nfunction isDataView(obj) {\n  return obj && DataView.prototype.isPrototypeOf(obj)\n}\n\nif (support.arrayBuffer) {\n  var viewClasses = [\n    '[object Int8Array]',\n    '[object Uint8Array]',\n    '[object Uint8ClampedArray]',\n    '[object Int16Array]',\n    '[object Uint16Array]',\n    '[object Int32Array]',\n    '[object Uint32Array]',\n    '[object Float32Array]',\n    '[object Float64Array]'\n  ]\n\n  var isArrayBufferView =\n    ArrayBuffer.isView ||\n    function(obj) {\n      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1\n    }\n}\n\nfunction normalizeName(name) {\n  if (typeof name !== 'string') {\n    name = String(name)\n  }\n  if (/[^a-z0-9\\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {\n    throw new TypeError('Invalid character in header field name: \"' + name + '\"')\n  }\n  return name.toLowerCase()\n}\n\nfunction normalizeValue(value) {\n  if (typeof value !== 'string') {\n    value = String(value)\n  }\n  return value\n}\n\n// Build a destructive iterator for the value list\nfunction iteratorFor(items) {\n  var iterator = {\n    next: function() {\n      var value = items.shift()\n      return {done: value === undefined, value: value}\n    }\n  }\n\n  if (support.iterable) {\n    iterator[Symbol.iterator] = function() {\n      return iterator\n    }\n  }\n\n  return iterator\n}\n\nfunction Headers(headers) {\n  this.map = {}\n\n  if (headers instanceof Headers) {\n    headers.forEach(function(value, name) {\n      this.append(name, value)\n    }, this)\n  } else if (Array.isArray(headers)) {\n    headers.forEach(function(header) {\n      this.append(header[0], header[1])\n    }, this)\n  } else if (headers) {\n    Object.getOwnPropertyNames(headers).forEach(function(name) {\n      this.append(name, headers[name])\n    }, this)\n  }\n}\n\nHeaders.prototype.append = function(name, value) {\n  name = normalizeName(name)\n  value = normalizeValue(value)\n  var oldValue = this.map[name]\n  this.map[name] = oldValue ? oldValue + ', ' + value : value\n}\n\nHeaders.prototype['delete'] = function(name) {\n  delete this.map[normalizeName(name)]\n}\n\nHeaders.prototype.get = function(name) {\n  name = normalizeName(name)\n  return this.has(name) ? this.map[name] : null\n}\n\nHeaders.prototype.has = function(name) {\n  return this.map.hasOwnProperty(normalizeName(name))\n}\n\nHeaders.prototype.set = function(name, value) {\n  this.map[normalizeName(name)] = normalizeValue(value)\n}\n\nHeaders.prototype.forEach = function(callback, thisArg) {\n  for (var name in this.map) {\n    if (this.map.hasOwnProperty(name)) {\n      callback.call(thisArg, this.map[name], name, this)\n    }\n  }\n}\n\nHeaders.prototype.keys = function() {\n  var items = []\n  this.forEach(function(value, name) {\n    items.push(name)\n  })\n  return iteratorFor(items)\n}\n\nHeaders.prototype.values = function() {\n  var items = []\n  this.forEach(function(value) {\n    items.push(value)\n  })\n  return iteratorFor(items)\n}\n\nHeaders.prototype.entries = function() {\n  var items = []\n  this.forEach(function(value, name) {\n    items.push([name, value])\n  })\n  return iteratorFor(items)\n}\n\nif (support.iterable) {\n  Headers.prototype[Symbol.iterator] = Headers.prototype.entries\n}\n\nfunction consumed(body) {\n  if (body.bodyUsed) {\n    return Promise.reject(new TypeError('Already read'))\n  }\n  body.bodyUsed = true\n}\n\nfunction fileReaderReady(reader) {\n  return new Promise(function(resolve, reject) {\n    reader.onload = function() {\n      resolve(reader.result)\n    }\n    reader.onerror = function() {\n      reject(reader.error)\n    }\n  })\n}\n\nfunction readBlobAsArrayBuffer(blob) {\n  var reader = new FileReader()\n  var promise = fileReaderReady(reader)\n  reader.readAsArrayBuffer(blob)\n  return promise\n}\n\nfunction readBlobAsText(blob) {\n  var reader = new FileReader()\n  var promise = fileReaderReady(reader)\n  reader.readAsText(blob)\n  return promise\n}\n\nfunction readArrayBufferAsText(buf) {\n  var view = new Uint8Array(buf)\n  var chars = new Array(view.length)\n\n  for (var i = 0; i < view.length; i++) {\n    chars[i] = String.fromCharCode(view[i])\n  }\n  return chars.join('')\n}\n\nfunction bufferClone(buf) {\n  if (buf.slice) {\n    return buf.slice(0)\n  } else {\n    var view = new Uint8Array(buf.byteLength)\n    view.set(new Uint8Array(buf))\n    return view.buffer\n  }\n}\n\nfunction Body() {\n  this.bodyUsed = false\n\n  this._initBody = function(body) {\n    /*\n      fetch-mock wraps the Response object in an ES6 Proxy to\n      provide useful test harness features such as flush. However, on\n      ES5 browsers without fetch or Proxy support pollyfills must be used;\n      the proxy-pollyfill is unable to proxy an attribute unless it exists\n      on the object before the Proxy is created. This change ensures\n      Response.bodyUsed exists on the instance, while maintaining the\n      semantic of setting Request.bodyUsed in the constructor before\n      _initBody is called.\n    */\n    this.bodyUsed = this.bodyUsed\n    this._bodyInit = body\n    if (!body) {\n      this._bodyText = ''\n    } else if (typeof body === 'string') {\n      this._bodyText = body\n    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {\n      this._bodyBlob = body\n    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {\n      this._bodyFormData = body\n    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n      this._bodyText = body.toString()\n    } else if (support.arrayBuffer && support.blob && isDataView(body)) {\n      this._bodyArrayBuffer = bufferClone(body.buffer)\n      // IE 10-11 can't handle a DataView body.\n      this._bodyInit = new Blob([this._bodyArrayBuffer])\n    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {\n      this._bodyArrayBuffer = bufferClone(body)\n    } else {\n      this._bodyText = body = Object.prototype.toString.call(body)\n    }\n\n    if (!this.headers.get('content-type')) {\n      if (typeof body === 'string') {\n        this.headers.set('content-type', 'text/plain;charset=UTF-8')\n      } else if (this._bodyBlob && this._bodyBlob.type) {\n        this.headers.set('content-type', this._bodyBlob.type)\n      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {\n        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')\n      }\n    }\n  }\n\n  if (support.blob) {\n    this.blob = function() {\n      var rejected = consumed(this)\n      if (rejected) {\n        return rejected\n      }\n\n      if (this._bodyBlob) {\n        return Promise.resolve(this._bodyBlob)\n      } else if (this._bodyArrayBuffer) {\n        return Promise.resolve(new Blob([this._bodyArrayBuffer]))\n      } else if (this._bodyFormData) {\n        throw new Error('could not read FormData body as blob')\n      } else {\n        return Promise.resolve(new Blob([this._bodyText]))\n      }\n    }\n\n    this.arrayBuffer = function() {\n      if (this._bodyArrayBuffer) {\n        var isConsumed = consumed(this)\n        if (isConsumed) {\n          return isConsumed\n        }\n        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {\n          return Promise.resolve(\n            this._bodyArrayBuffer.buffer.slice(\n              this._bodyArrayBuffer.byteOffset,\n              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength\n            )\n          )\n        } else {\n          return Promise.resolve(this._bodyArrayBuffer)\n        }\n      } else {\n        return this.blob().then(readBlobAsArrayBuffer)\n      }\n    }\n  }\n\n  this.text = function() {\n    var rejected = consumed(this)\n    if (rejected) {\n      return rejected\n    }\n\n    if (this._bodyBlob) {\n      return readBlobAsText(this._bodyBlob)\n    } else if (this._bodyArrayBuffer) {\n      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))\n    } else if (this._bodyFormData) {\n      throw new Error('could not read FormData body as text')\n    } else {\n      return Promise.resolve(this._bodyText)\n    }\n  }\n\n  if (support.formData) {\n    this.formData = function() {\n      return this.text().then(decode)\n    }\n  }\n\n  this.json = function() {\n    return this.text().then(JSON.parse)\n  }\n\n  return this\n}\n\n// HTTP methods whose capitalization should be normalized\nvar methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']\n\nfunction normalizeMethod(method) {\n  var upcased = method.toUpperCase()\n  return methods.indexOf(upcased) > -1 ? upcased : method\n}\n\nfunction Request(input, options) {\n  if (!(this instanceof Request)) {\n    throw new TypeError('Please use the \"new\" operator, this DOM object constructor cannot be called as a function.')\n  }\n\n  options = options || {}\n  var body = options.body\n\n  if (input instanceof Request) {\n    if (input.bodyUsed) {\n      throw new TypeError('Already read')\n    }\n    this.url = input.url\n    this.credentials = input.credentials\n    if (!options.headers) {\n      this.headers = new Headers(input.headers)\n    }\n    this.method = input.method\n    this.mode = input.mode\n    this.signal = input.signal\n    if (!body && input._bodyInit != null) {\n      body = input._bodyInit\n      input.bodyUsed = true\n    }\n  } else {\n    this.url = String(input)\n  }\n\n  this.credentials = options.credentials || this.credentials || 'same-origin'\n  if (options.headers || !this.headers) {\n    this.headers = new Headers(options.headers)\n  }\n  this.method = normalizeMethod(options.method || this.method || 'GET')\n  this.mode = options.mode || this.mode || null\n  this.signal = options.signal || this.signal\n  this.referrer = null\n\n  if ((this.method === 'GET' || this.method === 'HEAD') && body) {\n    throw new TypeError('Body not allowed for GET or HEAD requests')\n  }\n  this._initBody(body)\n\n  if (this.method === 'GET' || this.method === 'HEAD') {\n    if (options.cache === 'no-store' || options.cache === 'no-cache') {\n      // Search for a '_' parameter in the query string\n      var reParamSearch = /([?&])_=[^&]*/\n      if (reParamSearch.test(this.url)) {\n        // If it already exists then set the value with the current time\n        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())\n      } else {\n        // Otherwise add a new '_' parameter to the end with the current time\n        var reQueryString = /\\?/\n        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()\n      }\n    }\n  }\n}\n\nRequest.prototype.clone = function() {\n  return new Request(this, {body: this._bodyInit})\n}\n\nfunction decode(body) {\n  var form = new FormData()\n  body\n    .trim()\n    .split('&')\n    .forEach(function(bytes) {\n      if (bytes) {\n        var split = bytes.split('=')\n        var name = split.shift().replace(/\\+/g, ' ')\n        var value = split.join('=').replace(/\\+/g, ' ')\n        form.append(decodeURIComponent(name), decodeURIComponent(value))\n      }\n    })\n  return form\n}\n\nfunction parseHeaders(rawHeaders) {\n  var headers = new Headers()\n  // Replace instances of \\r\\n and \\n followed by at least one space or horizontal tab with a space\n  // https://tools.ietf.org/html/rfc7230#section-3.2\n  var preProcessedHeaders = rawHeaders.replace(/\\r?\\n[\\t ]+/g, ' ')\n  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill\n  // https://github.com/github/fetch/issues/748\n  // https://github.com/zloirock/core-js/issues/751\n  preProcessedHeaders\n    .split('\\r')\n    .map(function(header) {\n      return header.indexOf('\\n') === 0 ? header.substr(1, header.length) : header\n    })\n    .forEach(function(line) {\n      var parts = line.split(':')\n      var key = parts.shift().trim()\n      if (key) {\n        var value = parts.join(':').trim()\n        headers.append(key, value)\n      }\n    })\n  return headers\n}\n\nBody.call(Request.prototype)\n\nfunction Response(bodyInit, options) {\n  if (!(this instanceof Response)) {\n    throw new TypeError('Please use the \"new\" operator, this DOM object constructor cannot be called as a function.')\n  }\n  if (!options) {\n    options = {}\n  }\n\n  this.type = 'default'\n  this.status = options.status === undefined ? 200 : options.status\n  this.ok = this.status >= 200 && this.status < 300\n  this.statusText = options.statusText === undefined ? '' : '' + options.statusText\n  this.headers = new Headers(options.headers)\n  this.url = options.url || ''\n  this._initBody(bodyInit)\n}\n\nBody.call(Response.prototype)\n\nResponse.prototype.clone = function() {\n  return new Response(this._bodyInit, {\n    status: this.status,\n    statusText: this.statusText,\n    headers: new Headers(this.headers),\n    url: this.url\n  })\n}\n\nResponse.error = function() {\n  var response = new Response(null, {status: 0, statusText: ''})\n  response.type = 'error'\n  return response\n}\n\nvar redirectStatuses = [301, 302, 303, 307, 308]\n\nResponse.redirect = function(url, status) {\n  if (redirectStatuses.indexOf(status) === -1) {\n    throw new RangeError('Invalid status code')\n  }\n\n  return new Response(null, {status: status, headers: {location: url}})\n}\n\nvar DOMException = global.DOMException\ntry {\n  new DOMException()\n} catch (err) {\n  DOMException = function(message, name) {\n    this.message = message\n    this.name = name\n    var error = Error(message)\n    this.stack = error.stack\n  }\n  DOMException.prototype = Object.create(Error.prototype)\n  DOMException.prototype.constructor = DOMException\n}\n\nfunction fetch(input, init) {\n  return new Promise(function(resolve, reject) {\n    var request = new Request(input, init)\n\n    if (request.signal && request.signal.aborted) {\n      return reject(new DOMException('Aborted', 'AbortError'))\n    }\n\n    var xhr = new XMLHttpRequest()\n\n    function abortXhr() {\n      xhr.abort()\n    }\n\n    xhr.onload = function() {\n      var options = {\n        status: xhr.status,\n        statusText: xhr.statusText,\n        headers: parseHeaders(xhr.getAllResponseHeaders() || '')\n      }\n      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')\n      var body = 'response' in xhr ? xhr.response : xhr.responseText\n      setTimeout(function() {\n        resolve(new Response(body, options))\n      }, 0)\n    }\n\n    xhr.onerror = function() {\n      setTimeout(function() {\n        reject(new TypeError('Network request failed'))\n      }, 0)\n    }\n\n    xhr.ontimeout = function() {\n      setTimeout(function() {\n        reject(new TypeError('Network request failed'))\n      }, 0)\n    }\n\n    xhr.onabort = function() {\n      setTimeout(function() {\n        reject(new DOMException('Aborted', 'AbortError'))\n      }, 0)\n    }\n\n    function fixUrl(url) {\n      try {\n        return url === '' && global.location.href ? global.location.href : url\n      } catch (e) {\n        return url\n      }\n    }\n\n    xhr.open(request.method, fixUrl(request.url), true)\n\n    if (request.credentials === 'include') {\n      xhr.withCredentials = true\n    } else if (request.credentials === 'omit') {\n      xhr.withCredentials = false\n    }\n\n    if ('responseType' in xhr) {\n      if (support.blob) {\n        xhr.responseType = 'blob'\n      } else if (\n        support.arrayBuffer &&\n        request.headers.get('Content-Type') &&\n        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1\n      ) {\n        xhr.responseType = 'arraybuffer'\n      }\n    }\n\n    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {\n      Object.getOwnPropertyNames(init.headers).forEach(function(name) {\n        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))\n      })\n    } else {\n      request.headers.forEach(function(value, name) {\n        xhr.setRequestHeader(name, value)\n      })\n    }\n\n    if (request.signal) {\n      request.signal.addEventListener('abort', abortXhr)\n\n      xhr.onreadystatechange = function() {\n        // DONE (success or failure)\n        if (xhr.readyState === 4) {\n          request.signal.removeEventListener('abort', abortXhr)\n        }\n      }\n    }\n\n    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)\n  })\n}\n\nfetch.polyfill = true\n\nif (!global.fetch) {\n  global.fetch = fetch\n  global.Headers = Headers\n  global.Request = Request\n  global.Response = Response\n}\n\n\n//# sourceURL=webpack://Spaghettify/./node_modules/whatwg-fetch/fetch.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	Spaghettify = __webpack_exports__;
/******/ 	
/******/ })()
;