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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracky = __webpack_require__(3);
	
	var _tracky2 = _interopRequireDefault(_tracky);
	
	var _tracky3 = __webpack_require__(4);
	
	var _tracky4 = _interopRequireDefault(_tracky3);
	
	var _deepAssign = __webpack_require__(6);
	
	var _deepAssign2 = _interopRequireDefault(_deepAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tracky = function () {
	  function Tracky() {
	    var selector = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Tracky);
	
	    // Register Selectors
	    this.registerSelectors(selector, true);
	
	    // Set Options
	    this._options = (0, _deepAssign2.default)(_tracky2.default, options);
	
	    // Set Listeners
	    this._listeners = [{ class: _tracky4.default, key: 'scroll' }]; // Todo: load from external resources
	
	    this._bindListeners();
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
	  }, {
	    key: '_getEventsOptions',
	    value: function _getEventsOptions() {
	      var evt = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      if (evt) {
	        if (typeof this._options.events[evt] !== 'undefined') {
	          return this._options.events[evt];
	        }
	      } else {
	        return {};
	      }
	    }
	  }, {
	    key: '_bindListeners',
	    value: function _bindListeners() {
	      var _this2 = this;
	
	      console.log(this._listeners);
	      console.log(this._options);
	      this._listeners.forEach(function (l) {
	        var options = _this2._getEventsOptions(l.key);
	        console.log(options);
	        if (typeof options.enabled !== 'undefined' && options.enabled === true) {
	          l.instance = new l.class(l.key, _this2, options, _this2._options);
	        }
	      });
	    }
	  }]);
	
	  return Tracky;
	}();
	
	exports.default = Tracky;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  classPrefix: 'tracky-',
	  classSuffix: '',
	  classGtPrefix: 'gt-',
	  classLtPrefix: 'lt-',
	  classEqPrefix: 'eq-',
	  classBtPrefix: 'bt-',
	  events: {
	    scroll: {
	      enabled: true,
	      breakpoints: []
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracky = __webpack_require__(5);
	
	var _tracky2 = _interopRequireDefault(_tracky);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TrackyScroll = function (_TrackyEvent) {
	  _inherits(TrackyScroll, _TrackyEvent);
	
	  function TrackyScroll() {
	    _classCallCheck(this, TrackyScroll);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrackyScroll).apply(this, arguments));
	  }
	
	  _createClass(TrackyScroll, [{
	    key: '_listener',
	    value: function _listener(domNode) {
	
	      var position = this._getScrollPosition(domNode);
	
	      this.classify(domNode, {
	        absolute: position.absolute.top,
	        percent: position.percent.top
	      });
	    }
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent(domNode) {
	      domNode.addEventListener('scroll', this._bindListener);
	    }
	  }, {
	    key: '_percentRound',
	    value: function _percentRound(value) {
	      return parseFloat(value.toFixed(2)) * 100;
	    }
	  }, {
	    key: '_getScrollPosition',
	    value: function _getScrollPosition(domNode) {
	      if (this._isBody(domNode)) {
	
	        var doc = document.documentElement;
	        var b = document.body;
	
	        return {
	          absolute: {
	            top: doc.scrollTop || b.scrollTop,
	            left: doc.scrollLeft || b.scrollLeft
	          },
	          percent: {
	            top: this._percentRound(doc.scrollTop || b.scrollTop / ((doc.scrollHeight || b.scrollHeight) - doc.clientHeight)),
	            left: this._percentRound(!!doc.scrollLeft || !!b.scrollLeft ? doc.scrollLeft || b.scrollLeft / ((doc.scrollWidth || b.scrollWidth) - doc.clientWidth) : 0)
	          }
	        };
	      } else {
	        return {
	          absolute: {
	            top: domNode.scrollTop,
	            left: domNode.scrollLeft
	          },
	          percent: {
	            top: this._percentRound(domNode.scrollTop / (domNode.scrollHeight - domNode.offsetHeight)),
	            left: this._percentRound(domNode.scrollLeft ? domNode.scrollLeft / (domNode.scrollWidth - domNode.offsetWidth) : 0)
	          }
	        };
	      }
	    }
	  }, {
	    key: 'bindBodyEvent',
	    value: function bindBodyEvent() {
	
	      window.addEventListener('scroll', this._bindBodyListener);
	    }
	  }, {
	    key: 'unbindBodyEvent',
	    value: function unbindBodyEvent() {
	      window.removeEventListener('scroll', this._bindBodyListener);
	    }
	  }, {
	    key: 'unbindEvent',
	    value: function unbindEvent(domNode) {
	      domNode.removeEventListener('scroll', this._bindListener);
	    }
	  }, {
	    key: '_isBody',
	    value: function _isBody(domNode) {
	      return domNode.nodeName === 'BODY';
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this2 = this;
	
	      this.getNodes().forEach(function (n) {
	        if (n) {
	          n.forEach(function (_n) {
	            if (_this2._isBody(_n)) {
	              _this2.bindBodyEvent();
	            } else {
	              _this2.bindEvent(_n);
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'unbindEvents',
	    value: function unbindEvents() {
	      var _this3 = this;
	
	      this.getNodes().forEach(function (n) {
	        if (n) {
	          n.forEach(function (_n) {
	            if (_this3._isBody(_n)) {
	              _this3.unbindBodyEvent();
	            } else {
	              _this3.unbindEvent(_n);
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'onStart',
	    value: function onStart() {
	      var _this4 = this;
	
	      // Ugly but necessary to keep this-context combined with eventListener add/remove
	      this._bindListener = function (e) {
	        _this4._listener(e.target);
	      };
	
	      // It becomes even worse if we consider that body/window needs a separate handling
	      // but necessary to keep this-context combined with eventListener add/remove
	      var last_known_scroll_position = 0;
	      var ticking = false;
	
	      this._bindBodyListener = function (e) {
	
	        last_known_scroll_position = window.scrollY;
	
	        if (!ticking) {
	          window.requestAnimationFrame(function () {
	            _this4._listener(e.target.activeElement);
	            ticking = false;
	          });
	        }
	
	        ticking = true;
	      };
	
	      this.bindEvents();
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.unbindEvents();
	    }
	  }]);
	
	  return TrackyScroll;
	}(_tracky2.default);
	
	exports.default = TrackyScroll;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TrackyEvent = function () {
	  function TrackyEvent(eventKey) {
	    var tracky = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var globalOptions = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    _classCallCheck(this, TrackyEvent);
	
	    this._key = eventKey;
	    this._tracky = tracky;
	    this._options = options;
	    this._globalOptions = globalOptions;
	
	    this._options.breakpoints = this._transformBreakpoints(options.breakpoints);
	    this._classNames = this._extractClasses();
	
	    this.start();
	  }
	
	  _createClass(TrackyEvent, [{
	    key: 'getNodes',
	    value: function getNodes() {
	      return this._tracky && this._tracky instanceof Tracky ? this._tracky._nodes : [];
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.onStart();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.onStop();
	    }
	  }, {
	    key: '_buildClassName',
	    value: function _buildClassName(value, modifier) {
	      var o = this._globalOptions;
	      return o.classPrefix + this._key + '-' + modifier + value + o.classSuffix;
	    }
	  }, {
	    key: '_transformValue',
	    value: function _transformValue(value) {
	
	      var t = null;
	
	      if (typeof value === 'number') {
	        t = [value, { percent: false }];
	      } else if (typeof value === 'string') {
	        t = value.indexOf('%') == value.length - 1 ? [parseInt(value, 10), { percent: true }] : null;
	      } else {
	        t = value;
	      }
	
	      return t;
	    }
	  }, {
	    key: '_transformBreakpoints',
	    value: function _transformBreakpoints(bp) {
	      var _this = this;
	
	      return bp.map(function (p) {
	
	        var go = _this._globalOptions;
	
	        var prep = typeof p === 'number' || typeof p === 'string' ? {
	          value: p
	        } : p;
	
	        var hasBetween = !(typeof prep.min !== 'undefined' && typeof prep.max !== 'undefined') ? false : typeof prep.applyBt !== 'undefined' ? prep.applyBt : true;
	
	        var hasValue = !hasBetween && typeof prep.value !== 'undefined';
	
	        var hasCustomCss = typeof prep.css !== 'undefined' && !!prep.css;
	
	        if (hasCustomCss && typeof prep.css === 'string') {
	          prep.css = {
	            eq: prep.css,
	            bt: prep.css
	          };
	        }
	
	        if (hasValue) {
	          prep.value = _this._transformValue(prep.value);
	        } else if (hasBetween) {
	          prep.min = _this._transformValue(prep.min);
	          prep.max = _this._transformValue(prep.max);
	        }
	
	        return {
	          css: {
	            lt: !hasBetween ? hasCustomCss && typeof prep.css.lt !== 'undefined' ? prep.css.lt : _this._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classLtPrefix) : null,
	            gt: !hasBetween ? hasCustomCss && typeof prep.css.gt !== 'undefined' ? prep.css.gt : _this._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classGtPrefix) : null,
	            eq: !hasBetween ? hasCustomCss && typeof prep.css.eq !== 'undefined' ? prep.css.eq : _this._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classEqPrefix) : null,
	            bt: hasBetween ? hasCustomCss && typeof prep.css.bt !== 'undefined' ? prep.css.bt : _this._buildClassName(prep.min[0] + (prep.min[1].percent ? 'pc' : '') + '-' + prep.max[0] + (prep.max[1].percent ? 'pc' : ''), go.classBtPrefix) : null
	          },
	          applyLt: !hasBetween && typeof prep.applyLt !== 'undefined' ? prep.applyLt : !hasBetween,
	          applyGt: !hasBetween && typeof prep.applyGt !== 'undefined' ? prep.applyGt : !hasBetween,
	          applyEq: !hasBetween && typeof prep.applyEq !== 'undefined' ? prep.applyEq : !hasBetween,
	          applyBt: hasBetween,
	          value: hasValue ? prep.value : null,
	          min: hasBetween ? prep.min : null,
	          max: hasBetween ? prep.max : null
	        };
	      });
	    }
	  }, {
	    key: '_extractClasses',
	    value: function _extractClasses() {
	      var bps = this._options.breakpoints;
	      var classArray = [];
	      bps.forEach(function (bp) {
	        for (var c in bp.css) {
	          if (bp.css[c]) {
	            classArray.push(bp.css[c]);
	          }
	        }
	      });
	      return classArray;
	    }
	  }, {
	    key: 'classify',
	    value: function classify(domNode) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? { absolute: 0, percent: 0 } : arguments[1];
	
	
	      var bp = this._options.breakpoints;
	      var classes = [];
	
	      if (bp.length > 0) {
	        for (var l = bp.length; l; l--) {
	          var _bp = bp[l - 1];
	
	          // Check lt
	          if (_bp.applyLt && (!_bp.value[1].percent && value.absolute < _bp.value[0] || _bp.value[1].percent && value.percent < _bp.value[0])) {
	            classes.push(_bp.css.lt);
	          }
	
	          // Check gt
	          if (_bp.applyGt && (!_bp.value[1].percent && value.absolute > _bp.value[0] || _bp.value[1].percent && value.percent > _bp.value[0])) {
	            classes.push(_bp.css.gt);
	          }
	
	          // Check eq
	          if (_bp.applyEq && (!_bp.value[1].percent && value.absolute === _bp.value[0] || _bp.value[1].percent && value.percent === _bp.value[0])) {
	            classes.push(_bp.css.eq);
	          }
	
	          // Check between
	          if (_bp.applyBt && (!_bp.min[1].percent && value.absolute >= _bp.min[0] || _bp.min[1].percent && value.percent >= _bp.min[0]) && (!_bp.max[1].percent && value.absolute <= _bp.max[0] || _bp.max[1].percent && value.percent <= _bp.max[0])) {
	            classes.push(_bp.css.bt);
	          }
	        }
	      }
	
	      this.attachClasses(domNode, classes);
	    }
	  }, {
	    key: 'attachClasses',
	    value: function attachClasses(domNode, classNames) {
	
	      var available = this._classNames;
	      var current = domNode.className;
	
	      if (domNode.classList) {
	        (function () {
	
	          var applied = current.replace(/\s+/g, ' ').split(' ').filter(function (c) {
	            return available.indexOf(c) > -1;
	          });
	
	          var toRemove = applied.filter(function (c) {
	            return classNames.indexOf(c) === -1;
	          });
	
	          var toApply = classNames.filter(function (c) {
	            return applied.indexOf(c) === -1;
	          });
	
	          if (toRemove.length) {
	            for (var l = toRemove.length; l; l--) {
	              domNode.classList.remove(toRemove[l - 1]);
	            }
	          }
	
	          if (toApply.length) {
	            for (var _l = toApply.length; _l; _l--) {
	              domNode.classList.add(toApply[_l - 1]);
	            }
	          }
	        })();
	      } else {
	
	        // Old Browser Fallback
	
	        var newClassNames = current.replace(/\s+/g, ' ').split(' ').filter(function (c) {
	          return available.indexOf(c) === -1;
	        }).concat(classNames).join(' ');
	
	        if (current !== newClassNames) {
	          domNode.className = newClassNames;
	        }
	      }
	    }
	  }]);
	
	  return TrackyEvent;
	}();
	
	exports.default = TrackyEvent;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObj = __webpack_require__(7);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Sources cannot be null or undefined');
		}
	
		return Object(val);
	}
	
	function assignKey(to, from, key) {
		var val = from[key];
	
		if (val === undefined || val === null) {
			return;
		}
	
		if (hasOwnProperty.call(to, key)) {
			if (to[key] === undefined || to[key] === null) {
				throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
			}
		}
	
		if (!hasOwnProperty.call(to, key) || !isObj(val)) {
			to[key] = val;
		} else {
			to[key] = assign(Object(to[key]), from[key]);
		}
	}
	
	function assign(to, from) {
		if (to === from) {
			return to;
		}
	
		from = Object(from);
	
		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				assignKey(to, from, key);
			}
		}
	
		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(from);
	
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					assignKey(to, from, symbols[i]);
				}
			}
		}
	
		return to;
	}
	
	module.exports = function deepAssign(target) {
		target = toObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			assign(target, arguments[s]);
		}
	
		return target;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (x) {
		var type = typeof x;
		return x !== null && (type === 'object' || type === 'function');
	};


/***/ }
/******/ ]);
//# sourceMappingURL=tracky.js.map