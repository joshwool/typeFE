/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://typing/./src/styles/index.scss?");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar generate = __webpack_require__(/*! ./words/generate */ \"./src/ts/words/generate.ts\");\nvar input = __webpack_require__(/*! ./words/input */ \"./src/ts/words/input.ts\");\n__webpack_require__(/*! ../styles/index.scss */ \"./src/styles/index.scss\");\ngenerate.genWords(50);\ninput.focus();\ninput.KeyPress();\nconsole.log(\"test\");\n\n\n//# sourceURL=webpack://typing/./src/ts/index.ts?");

/***/ }),

/***/ "./src/ts/words/generate.ts":
/*!**********************************!*\
  !*** ./src/ts/words/generate.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.genWords = exports.lineInds = exports.curWordList = void 0;\nvar wordfreq = __webpack_require__(/*! ../../../static/json/wordfreq.json */ \"./static/json/wordfreq.json\");\nvar DisWidth = screen.width * 0.7;\nexports.curWordList = [];\nexports.lineInds = [];\nfunction genWords(num) {\n    var curWordInd = 0;\n    while (curWordInd < num) {\n        var line = $(\"<div class='line'></div>\");\n        var lineEnd = false;\n        while (!lineEnd) {\n            var randWord = wordfreq.wordfreq[Math.floor(Math.random() * 1000)];\n            var word = $(\"<div class='word'></div>\");\n            for (var x = 0; x < randWord.length; x++) {\n                word.append(\"<span class='char'>\" + randWord.charAt(x) + \"</span>\");\n            }\n            line.append(word);\n            $(\"#wordDis\").append(line);\n            if (line.outerWidth(true) > $(\"#wordDis\").outerWidth()) {\n                $($(\".word\")[curWordInd]).remove();\n                lineEnd = true;\n                exports.lineInds.push(curWordInd - 1);\n            }\n            else {\n                curWordInd++;\n                exports.curWordList.push(randWord);\n                if (curWordInd === num) {\n                    lineEnd = true;\n                }\n            }\n        }\n    }\n}\nexports.genWords = genWords;\n\n\n//# sourceURL=webpack://typing/./src/ts/words/generate.ts?");

/***/ }),

/***/ "./src/ts/words/input.ts":
/*!*******************************!*\
  !*** ./src/ts/words/input.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.KeyPress = exports.focus = exports.keyArr = void 0;\nfunction Key(name) {\n    this.key = name;\n    this.hits = 0;\n    this.miss = 0;\n}\nfunction focus() {\n    $(\"#wordDis\").click(function () {\n        $(\"#wordInp\").focus();\n    });\n}\nexports.focus = focus;\nfunction KeyPress() {\n    $(\"#wordInp\").keydown(function (event) {\n        var inpVal = $(\"#wordInp\").val();\n        console.log(event.keyCode);\n    });\n}\nexports.KeyPress = KeyPress;\n\n\n//# sourceURL=webpack://typing/./src/ts/words/input.ts?");

/***/ }),

/***/ "./static/json/wordfreq.json":
/*!***********************************!*\
  !*** ./static/json/wordfreq.json ***!
  \***********************************/
/***/ ((module) => {


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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/index.ts");
/******/ 	
/******/ })()
;