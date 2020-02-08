/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./index.jsx","vendors-index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.jsx":
/*!*******************!*\
  !*** ./index.jsx ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_igaroot_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/igaroot.jsx */ \"./js/igaroot.jsx\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.less */ \"./index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_thestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/thestore */ \"./js/thestore.js\");\n\n\n\n\n\n\nwindow.onload = main;\n\nfunction main() {\n  react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.render(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_0__[\"Provider\"], {\n    store: _js_thestore__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_js_igaroot_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null)), document.querySelector(\".iga-root\"));\n}\n\n//# sourceURL=webpack:///./index.jsx?");

/***/ }),

/***/ "./index.less":
/*!********************!*\
  !*** ./index.less ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.less?");

/***/ }),

/***/ "./js/igaroot.jsx":
/*!************************!*\
  !*** ./js/igaroot.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _imgurhelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imgurhelpers */ \"./js/imgurhelpers.js\");\n/* harmony import */ var _thestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./thestore */ \"./js/thestore.js\");\n/* harmony import */ var _previewpanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./previewpanel */ \"./js/previewpanel.tsx\");\n/* harmony import */ var viewerjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! viewerjs */ \"./node_modules/viewerjs/dist/viewer.js\");\n/* harmony import */ var viewerjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(viewerjs__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var viewerjs_dist_viewer_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! viewerjs/dist/viewer.css */ \"./node_modules/viewerjs/dist/viewer.css\");\n/* harmony import */ var viewerjs_dist_viewer_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(viewerjs_dist_viewer_css__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n/* IgaRoot(store-array imgs)\r\n   imgs: array of imgs to load, from the store*/\n\nclass IgaRoot extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      currentImage: null,\n      currentImageIndex: 0\n    }; //image repositioning has not completed, dont save image positioning if the image changes\n\n    this.imageChangeInProgress = false; //fit height operation occured, next time it will fit width, resets every image change to fit height\n\n    this.justFitHeight = false;\n    this.theviewer; //the actual viewer object\n\n    this.theviewerElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef(); //the element viewer is attached to\n  }\n\n  componentDidMount() {\n    this.theviewer = new viewerjs__WEBPACK_IMPORTED_MODULE_5___default.a(this.theviewerElement.current, {\n      inline: true,\n      title: false,\n      keyboard: false,\n      button: false,\n      zoomRatio: .3,\n      backdrop: false,\n      transition: false,\n      ready: () => {\n        this.theviewer.full();\n      },\n      viewed: () => {\n        this.imageChangeInProgress = false;\n\n        if (_.get(this.state.currentImage, \"zoom\")) {\n          this.theviewer.zoomTo(this.state.currentImage.zoom);\n          this.theviewer.moveTo(this.state.currentImage.left, this.state.currentImage.top);\n        } else if (this.theviewer.containerData.width / this.theviewer.containerData.height > this.theviewer.imageData.aspectRatio) {\n          this.fitHeight();\n        } else {\n          this.fitWidth();\n        }\n      }\n    }); // getAlbumInfo(\"ZVPTV\",(data)=>{\n    //   console.log(data);\n    // });\n\n    var imgurHash = window.location.hash.split(\"#\");\n\n    if (imgurHash.length > 1) {\n      Object(_imgurhelpers__WEBPACK_IMPORTED_MODULE_2__[\"getAlbum\"])(imgurHash[1], data => {\n        Object(_thestore__WEBPACK_IMPORTED_MODULE_3__[\"loadImgurImgsAction\"])(data.data);\n      });\n    }\n\n    this.keyControl();\n    window.viewer = this.theviewer;\n    window.igaroot = this;\n  }\n\n  componentDidUpdate() {\n    this.theviewer.update();\n  } //do fit width on the viewer\n\n\n  fitWidth() {\n    this.theviewer.zoomTo(this.theviewer.containerData.width / this.theviewer.imageData.naturalWidth);\n    this.theviewer.moveTo(0, this.theviewer.containerData.height / 2 - this.theviewer.imageData.height / 2);\n  } //do fit height on the viewer\n\n\n  fitHeight() {\n    this.theviewer.zoomTo(this.theviewer.containerData.height / this.theviewer.imageData.naturalHeight);\n    this.theviewer.moveTo(this.theviewer.containerData.width / 2 - this.theviewer.imageData.width / 2, 0);\n  } //navigate to the given image index\n\n\n  navigateImage(imgIndex) {\n    if (imgIndex >= this.props.imgs.length || imgIndex < 0) {\n      return;\n    }\n\n    var currentimage = this.state.currentImage;\n\n    if (!currentimage) {\n      currentimage = this.props.imgs[0];\n    } // console.log(currentimage);\n    // console.log(this.theviewer);\n\n\n    if (!this.imageChangeInProgress) {\n      currentimage.zoom = this.theviewer.imageData.ratio;\n      currentimage.left = this.theviewer.imageData.left;\n      currentimage.top = this.theviewer.imageData.top;\n    }\n\n    this.imageChangeInProgress = true;\n    this.setState({\n      currentImageIndex: imgIndex,\n      currentImage: this.props.imgs[imgIndex]\n    });\n  } //deploy global keyboard controls\n\n\n  keyControl() {\n    document.addEventListener(\"keydown\", e => {\n      // console.log(e.key);\n      if (e.key != \"f\") {\n        this.justFitHeight = false;\n      }\n\n      if (e.key == \"e\") {\n        this.theviewer.zoom(.1, true);\n      } else if (e.key == \"q\") {\n        this.theviewer.zoom(-.1, true);\n      } else if (e.key == \"ArrowRight\" || e.key == \" \" || e.key == \"d\") {\n        this.navigateImage(this.state.currentImageIndex + 1);\n      } else if (e.key == \"ArrowLeft\" || e.key == \"a\") {\n        this.navigateImage(this.state.currentImageIndex - 1);\n      } else if (e.key == \"f\") {\n        if (this.justFitHeight) {\n          this.fitWidth();\n          this.justFitHeight = false;\n        } else {\n          this.fitHeight();\n          this.justFitHeight = true;\n        }\n      }\n    });\n  }\n\n  render() {\n    if (this.theviewer) {\n      this.theviewer.view(this.state.currentImageIndex);\n    }\n\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"the-viewer\"\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ul\", {\n      ref: this.theviewerElement\n    }, _.map(this.props.imgs, (x, i) => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n        key: i\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        src: x.link\n      }));\n    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_previewpanel__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      imgs: this.props.imgs\n    }));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(storestate => {\n  return {\n    imgs: storestate.imgs\n  };\n})(IgaRoot));\n\n//# sourceURL=webpack:///./js/igaroot.jsx?");

/***/ }),

/***/ "./js/imgurhelpers.js":
/*!****************************!*\
  !*** ./js/imgurhelpers.js ***!
  \****************************/
/*! exports provided: getAlbum, getAlbumInfo, viewLimits */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAlbum\", function() { return getAlbum; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAlbumInfo\", function() { return getAlbumInfo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"viewLimits\", function() { return viewLimits; });\n/*string url: imgur album tag string thing\r\nfunction callback(object response): callback function\r\nobject response: result album*/\nfunction getAlbum(url, callback) {\n  var r = new XMLHttpRequest();\n  r.open(\"GET\", `https://api.imgur.com/3/album/${url}/images`);\n\n  r.onreadystatechange = () => {\n    if (r.readyState == 4) {\n      callback(JSON.parse(r.response));\n    }\n  };\n\n  r.setRequestHeader(\"Authorization\", \"Client-ID 28bf65f46c4de3c\");\n  r.send();\n} //same input/return style as getAlbum()\n\n\nfunction getAlbumInfo(url, callback) {\n  var r = new XMLHttpRequest();\n  r.open(\"GET\", `https://api.imgur.com/3/album/${url}`);\n\n  r.onreadystatechange = () => {\n    if (r.readyState == 4) {\n      callback(JSON.parse(r.response));\n    }\n  };\n\n  r.setRequestHeader(\"Authorization\", \"Client-ID 28bf65f46c4de3c\");\n  r.send();\n}\n\nfunction viewLimits() {\n  var r = new XMLHttpRequest();\n  r.open(\"GET\", \"https://api.imgur.com/3/credits\");\n\n  r.onreadystatechange = () => {\n    if (r.readyState == 4) {\n      console.log(r.response);\n    }\n  };\n\n  r.setRequestHeader(\"Authorization\", \"Client-ID 28bf65f46c4de3c\");\n  r.send();\n}\n\n\n\n//# sourceURL=webpack:///./js/imgurhelpers.js?");

/***/ }),

/***/ "./js/previewpanel.tsx":
/*!*****************************!*\
  !*** ./js/previewpanel.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PreviewPanel; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* PreviewPanel(ImageObject[] imgs) */\nclass PreviewPanel extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    var thumbnails = _.map(this.props.imgs, x => {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PreviewThumbnail, {\n        thumbnailurl: convertThumbnail(x.link)\n      });\n    });\n\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"preview-panel\"\n    }, thumbnails);\n  }\n\n}\n/* PreviewThumbnail(string thumbnailurl) */\n\nclass PreviewThumbnail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: this.props.thumbnailurl\n    });\n  }\n\n} // give it imgur url, converts it into a thumbnail url\n\n\nfunction convertThumbnail(url) {\n  // match1 should be the ID of the image\n  // match2 should be the file extension of the image, including the period\n  var match = url.match(/https:\\/\\/i\\.imgur\\.com\\/(\\w+)(\\.\\w+)/);\n\n  if (!match) {\n    return \"\";\n  }\n\n  return `https://i.imgur.com/${match[1]}b${match[2]}`;\n}\n\n//# sourceURL=webpack:///./js/previewpanel.tsx?");

/***/ }),

/***/ "./js/thestore.js":
/*!************************!*\
  !*** ./js/thestore.js ***!
  \************************/
/*! exports provided: loadImgurImgsAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadImgurImgsAction\", function() { return loadImgurImgsAction; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar store; //load imgur images, give it array of imgur image data objects from an imgur api call\n\nfunction loadImgurImgsAction(data) {\n  store.dispatch({\n    type: \"loadImgurImgs\",\n    data\n  });\n} //reducer for imgs, array containing loaded images\n\nfunction imgsReduce(imgs, act) {\n  if (act.type == \"loadImgurImgs\") {\n    return _.map(act.data, x => {\n      return {\n        link: x.link\n      };\n    });\n  }\n\n  return imgs;\n}\n\nstore = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])((state, act) => {\n  return {\n    imgs: imgsReduce(state.imgs, act)\n  };\n}, {\n  imgs: []\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n//# sourceURL=webpack:///./js/thestore.js?");

/***/ })

/******/ });