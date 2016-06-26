/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// Not happy with this solution
	var Tracky = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Tracky"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultOptions = {
	    enableScroll: true
	};
	
	var Tracky = function () {
	    function Tracky() {
	        var selector = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	        _classCallCheck(this, Tracky);
	
	        // Register Selectors
	        this.registerSelectors(selector, true);
	
	        // Set Options
	        this._options = Object.assign(defaultOptions, options);
	    }
	
	    /**
	     * registerSelectors - updates the querySelectors for DOM listeners
	     * @param selector
	     * @param replace
	     * @returns {Array}
	     */
	
	
	    _createClass(Tracky, [{
	        key: 'registerSelectors',
	        value: function registerSelectors(selector) {
	            var replace = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	
	            // Cleanup selector to contain only valid selectors
	            selector = this._cleanupSelector(selector);
	
	            // Ensure this._selectors is available and an array
	            this._selectors = !!this._selectors && !replace ? this._selectors : [];
	
	            // Push Selectors
	            if (selector instanceof Array) {
	                this._selectors = this._selectors.concat(selector);
	            } else if (typeof selector === 'string') {
	                this._selectors.push(selector);
	            }
	
	            // Cleanup Unique selectors
	            this._selectors = [].concat(_toConsumableArray(new Set(this._selectors)));
	
	            // Register Nodes
	            this.refreshNodes();
	
	            return this._selectors;
	        }
	
	        /**
	         * addSelector
	         * @param selector
	         * @returns {Tracky}
	         */
	
	    }, {
	        key: 'addSelector',
	        value: function addSelector() {
	            var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	            if (selector) {
	                this.registerSelectors(selector);
	            }
	            return this;
	        }
	
	        /**
	         * removeSelector
	         * @param selector
	         * @returns {Tracky}
	         */
	
	    }, {
	        key: 'removeSelector',
	        value: function removeSelector() {
	            var _this = this;
	
	            var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	
	            if (selector) {
	                (function () {
	
	                    var _s = selector instanceof Array ? selector : [selector];
	                    var _found = 0;
	
	                    _this._selectors = _this._selectors.filter(function (li) {
	                        var _in = _s.indexOf(li) > -1;
	                        if (_in) {
	                            _found++;
	                        }
	                        return !_in;
	                    });
	
	                    if (_found > 0) {
	                        _this.refreshNodes();
	                    }
	                })();
	            }
	
	            return this;
	        }
	
	        /**
	         * refreshNodes - assign DOM nodes
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'refreshNodes',
	        value: function refreshNodes() {
	
	            this._nodes = this._selectors.map(function (selector) {
	                return typeof document !== 'undefined' && typeof document.querySelectorAll !== 'undefined' ? document.querySelectorAll(selector) : null;
	            });
	
	            return this._nodes;
	        }
	
	        /**
	         * cleanupSelector
	         * @private
	         */
	
	    }, {
	        key: '_cleanupSelector',
	        value: function _cleanupSelector() {
	            var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	            var selArray = selector instanceof Array ? selector : [selector];
	            return selArray.filter(function (s) {
	                return typeof s === 'string' && !!s && s.charAt(0) !== '-';
	            });
	        }
	    }]);
	
	    return Tracky;
	}();
	
	exports.default = Tracky;

/***/ }
/******/ ]);
//# sourceMappingURL=tracky.js.map