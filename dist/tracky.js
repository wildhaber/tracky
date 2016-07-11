/**
 * tracky.js - a helper module streamlining user interaction into css-classes
 * @version 1.0.0
 * @author Copyright (c) Raphael Wildhaber < https://github.com/wildhaber >
 * @url https://github.com/wildhaber/tracky#readme
 * @license MIT
 */
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

	'use strict';
	
	/*eslint-disable */
	
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
	
	var _tracky5 = __webpack_require__(6);
	
	var _tracky6 = _interopRequireDefault(_tracky5);
	
	var _deepAssign = __webpack_require__(8);
	
	var _deepAssign2 = _interopRequireDefault(_deepAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	    // Set nodes
	    this._nodes = [];
	
	    // Set Listeners
	    this._listeners = [{ class: _tracky4.default, key: 'scroll' }, { class: _tracky6.default, key: 'edge' }]; // Todo: load from external resources
	
	    this._bindListeners();
	    this._startGlobalWatcher();
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
	
	
	      // Ensure this._selectors is available and an array
	      this._selectors = !!this._selectors && !replace ? this._selectors : [];
	
	      // Push Selectors
	      this._selectors = this._selectors.concat(this._cleanupSelector(selector));
	
	      // Cleanup Unique selectors
	      this._selectors = this._selectors.filter(function (value, index, self) {
	        return self.indexOf(value) === index;
	      });
	
	      // Register Nodes
	      this._handleNodeChanges();
	
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
	            _this._handleNodeChanges();
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
	
	      /* istanbul ignore next */
	      this._nodes = this._selectors.map(function (selector) {
	        return typeof document !== 'undefined' && typeof document.querySelectorAll !== 'undefined' ? document.querySelectorAll(selector) : null;
	      });
	
	      return this._nodes;
	    }
	
	    /**
	     * getNodesCount
	     * @returns {number}
	     */
	
	  }, {
	    key: 'getNodesCount',
	    value: function getNodesCount() {
	      var counter = 0;
	      if (typeof this._nodes !== 'undefined' && this._nodes.length > 0) {
	        for (var l = this._nodes.length; l; l--) {
	          counter += this._nodes[l - 1].length;
	        }
	      }
	      return counter;
	    }
	
	    /**
	     * cleanupSelector
	     * @returns {Array}
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
	
	    /**
	     * _getEventsOptions
	     * @param evt
	     * @returns {Object}
	     * @private
	     */
	
	  }, {
	    key: '_getEventsOptions',
	    value: function _getEventsOptions() {
	      var evt = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      if (evt && typeof this._options.events[evt] !== 'undefined') {
	        return this._options.events[evt];
	      } else {
	        return {};
	      }
	    }
	
	    /**
	     * _bindListeners
	     * @private
	     */
	
	  }, {
	    key: '_bindListeners',
	    value: function _bindListeners() {
	      var _this2 = this;
	
	      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) this._listeners.forEach(function (l) {
	        var options = _this2._getEventsOptions(l.key);
	        if (typeof options.enable !== 'undefined' && options.enable === true) {
	          l.instance = new l.class(l.key, _this2, options, _this2._options);
	        }
	      });
	    }
	
	    /**
	     * _flattenNodes
	     * @param nodes
	     * @returns {Array}
	     * @private
	     */
	
	  }, {
	    key: '_flattenNodes',
	    value: function _flattenNodes() {
	      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	
	      var flatten = [];
	      var _nodes = nodes || (typeof this._nodes !== 'undefined' && this._nodes ? this._nodes : []);
	      if (_nodes instanceof Array && _nodes.length) {
	        _nodes.forEach(function (n) {
	          if (n && n.length && typeof n.forEach !== 'undefined') {
	            n.forEach(function (_n) {
	              if (flatten.indexOf(_n) === -1) {
	                flatten.push(_n);
	              }
	            });
	          }
	        });
	      }
	      return flatten;
	    }
	
	    /**
	     * findNodeDiff
	     * @param prior
	     * @param current
	     * @returns {{added: *, removed: *, changes: *}}
	     */
	
	  }, {
	    key: 'findNodeDiff',
	    value: function findNodeDiff(prior, current) {
	
	      var priorFlatten = Object.freeze(this._flattenNodes(prior));
	      var currentFlatten = Object.freeze(this._flattenNodes(current));
	
	      var newlyAdded = currentFlatten.filter(function (n) {
	        return priorFlatten.indexOf(n) === -1;
	      });
	
	      var removed = priorFlatten.filter(function (n) {
	        return currentFlatten.indexOf(n) === -1;
	      });
	
	      return {
	        added: newlyAdded,
	        removed: removed,
	        changes: newlyAdded.length + removed.length
	      };
	    }
	
	    /**
	     * _handleNodeChanges
	     * @private
	     */
	
	  }, {
	    key: '_handleNodeChanges',
	    value: function _handleNodeChanges() {
	
	      var priorNodes = this._nodes ? Object.freeze(this._nodes) : [];
	      this.refreshNodes();
	      var currentNodes = this._nodes ? Object.freeze(this._nodes) : [];
	
	      var diffNodes = this.findNodeDiff(priorNodes, currentNodes);
	
	      /* istanbul ignore if */
	      if (diffNodes.changes > 0) {
	
	        if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
	          this._listeners.forEach(function (listener) {
	            if (typeof listener.instance !== 'undefined') {
	              if (diffNodes.added.length) {
	                listener.instance.add(diffNodes.added);
	              }
	              if (diffNodes.removed.length) {
	                listener.instance.remove(diffNodes.removed);
	              }
	            }
	          });
	        }
	      }
	    }
	
	    /**
	     * _startGlobalWatcher
	     * @private
	     */
	
	  }, {
	    key: '_startGlobalWatcher',
	    value: function _startGlobalWatcher() {
	      var _this3 = this;
	
	      if (typeof MutationObserver === 'undefined') {
	        return;
	      }
	
	      /* istanbul ignore next */
	      var observer = new MutationObserver(function (mutations) {
	        mutations.forEach(function (mutation) {
	          if (typeof mutation.addedNodes !== 'undefined' && mutation.addedNodes && mutation.addedNodes.length > 0) {
	            _this3._handleNodeChanges();
	          }
	        });
	      });
	
	      // Notify me of everything!
	      /* istanbul ignore next */
	      var observerConfig = {
	        childList: true
	      };
	
	      /* istanbul ignore next */
	      var targetNode = document.body;
	
	      /* istanbul ignore next */
	      observer.observe(targetNode, observerConfig);
	    }
	
	    /**
	     * disable
	     * @param feature
	     * @returns boolean
	     */
	
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var feature = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	
	      if (!feature) {
	        return false;
	      }
	
	      var _features = typeof feature === 'string' ? [feature] : feature;
	
	      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
	        this._listeners.forEach(function (listener) {
	          if ((_features && _features.indexOf(listener.key) > -1 || !_features) && typeof listener.instance !== 'undefined') {
	            listener.instance.disable();
	          }
	        });
	      }
	
	      return true;
	    }
	
	    /**
	     * enable
	     * @param feature
	     * @returns boolean
	     */
	
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var feature = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	
	      if (!feature) {
	        return false;
	      }
	
	      var _features = typeof feature === 'string' ? [feature] : feature;
	
	      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
	        this._listeners.forEach(function (listener) {
	          if ((_features && _features.indexOf(listener.key) > -1 || !_features) && typeof listener.instance !== 'undefined') {
	            listener.instance.enable();
	          }
	        });
	      }
	
	      return true;
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
	      enable: true,
	      breakpoints: []
	    },
	    edge: {
	      enable: true,
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	
	
	    /**
	     * _listener
	     * @param domNode
	     * @private
	     */
	    value: function _listener(domNode) {
	
	      /* istanbul ignore next */
	      var position = this._getScrollPosition(domNode);
	
	      /* istanbul ignore next */
	      this.classify(domNode, position);
	    }
	
	    /**
	     * bindEvent
	     * @param domNode
	     */
	
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent(domNode) {
	
	      /* istanbul ignore next */
	      domNode.addEventListener('scroll', this._bindListener);
	
	      /* istanbul ignore next */
	      this._listener(domNode);
	    }
	
	    /**
	     * _getScrollPosition
	     * @param domNode
	     * @returns {*}
	     * @private
	     */
	
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
	
	    /**
	     * bindBodyEvent
	     */
	
	  }, {
	    key: 'bindBodyEvent',
	    value: function bindBodyEvent() {
	
	      /* istanbul ignore next */
	      window.addEventListener('scroll', this._bindBodyListener);
	
	      /* istanbul ignore next */
	      this._listener(document.body);
	    }
	
	    /**
	     * unbindBodyEvent
	     */
	
	  }, {
	    key: 'unbindBodyEvent',
	    value: function unbindBodyEvent() {
	
	      /* istanbul ignore next */
	      window.removeEventListener('scroll', this._bindBodyListener);
	    }
	
	    /**
	     * unbindEvent
	     * @param domNode
	     */
	
	  }, {
	    key: 'unbindEvent',
	    value: function unbindEvent(domNode) {
	
	      /* istanbul ignore next */
	      domNode.removeEventListener('scroll', this._bindListener);
	    }
	
	    /**
	     * _isBody
	     * @param domNode
	     * @returns {boolean}
	     * @private
	     */
	
	  }, {
	    key: '_isBody',
	    value: function _isBody(domNode) {
	      return !!domNode && _typeof(domNode.nodeName) && domNode.nodeName === 'BODY';
	    }
	
	    /**
	     * bindEvents
	     */
	
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this2 = this;
	
	      /* istanbul ignore next */
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
	
	    /**
	     * unbindEvents
	     */
	
	  }, {
	    key: 'unbindEvents',
	    value: function unbindEvents() {
	      var _this3 = this;
	
	      /* istanbul ignore next */
	      this.getNodes().forEach(function (n) {
	        if (n) {
	          n.forEach(function (_n) {
	            if (_this3._isBody(_n)) {
	              _this3.unbindBodyEvent();
	              _this3.cleanupClasses(document.body);
	            } else {
	              _this3.unbindEvent(_n);
	              _this3.cleanupClasses(_n);
	            }
	          });
	        }
	      });
	    }
	
	    /**
	     * onStart
	     */
	
	  }, {
	    key: 'onStart',
	    value: function onStart() {
	      var _this4 = this;
	
	      // Ugly but necessary to keep this-context combined with eventListener add/remove
	      /* istanbul ignore next */
	      this._bindListener = function (e) {
	        _this4._listener(e.target);
	      };
	
	      // It becomes even worse if we consider that body/window needs a separate handling
	      // but necessary to keep this-context combined with eventListener add/remove
	      var last_known_scroll_position = 0; // eslint-disable-line no-unused-vars
	      var ticking = false;
	
	      /* istanbul ignore next */
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
	
	    /**
	     * onStop
	     */
	
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      /* istanbul ignore next */
	      this.unbindEvents();
	    }
	
	    /**
	     * onAdd
	     * @param nodes
	     */
	
	  }, {
	    key: 'onAdd',
	    value: function onAdd(nodes) {
	      var _this5 = this;
	
	      /* istanbul ignore next */
	      nodes.forEach(function (_n) {
	        if (_this5._isBody(_n)) {
	          _this5.bindBodyEvent();
	        } else {
	          _this5.bindEvent(_n);
	        }
	      });
	    }
	
	    /**
	     * onRemove
	     * @param nodes
	     */
	
	  }, {
	    key: 'onRemove',
	    value: function onRemove(nodes) {
	      var _this6 = this;
	
	      /* istanbul ignore next */
	      nodes.forEach(function (_n) {
	        if (_this6._isBody(_n)) {
	          _this6.unbindBodyEvent();
	        } else {
	          _this6.unbindEvent(_n);
	        }
	      });
	    }
	
	    /**
	     * _transformBreakpoints
	     * @param bp
	     * @returns {Array|*}
	     * @private
	     */
	
	  }, {
	    key: '_transformBreakpoints',
	    value: function _transformBreakpoints(bp) {
	      var _this7 = this;
	
	      return bp instanceof Array ? bp.filter(function (p) {
	        return typeof p === 'number' && !isNaN(p) || typeof p === 'string' && !isNaN(parseFloat(p)) || (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && p !== null && (typeof p.value !== 'undefined' || typeof p.min !== 'undefined' && typeof p.max !== 'undefined');
	      }).map(function (p) {
	
	        var go = _this7._globalOptions;
	
	        var prep = typeof p === 'number' || typeof p === 'string' ? {
	          value: p
	        } : p;
	
	        var hasBetween = typeof prep.min === 'undefined' || typeof prep.max === 'undefined' ? false : typeof prep.applyBt !== 'undefined' ? prep.applyBt : true;
	
	        var hasValue = !hasBetween && typeof prep.value !== 'undefined';
	
	        var hasCustomCss = typeof prep.css !== 'undefined' && !!prep.css;
	
	        if (hasCustomCss && typeof prep.css === 'string') {
	          prep.css = {
	            eq: prep.css,
	            bt: prep.css
	          };
	        }
	
	        if (hasValue) {
	          prep.value = _this7._transformValue(prep.value);
	          if (!prep.value) {
	            return null;
	          }
	        } else if (hasBetween) {
	          prep.min = _this7._transformValue(prep.min);
	          prep.max = _this7._transformValue(prep.max);
	          if (!prep.min || !prep.max) {
	            return null;
	          }
	        }
	
	        return {
	          css: {
	            lt: !hasBetween ? hasCustomCss && typeof prep.css.lt !== 'undefined' ? prep.css.lt : _this7._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classLtPrefix) : null,
	            gt: !hasBetween ? hasCustomCss && typeof prep.css.gt !== 'undefined' ? prep.css.gt : _this7._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classGtPrefix) : null,
	            eq: !hasBetween ? hasCustomCss && typeof prep.css.eq !== 'undefined' ? prep.css.eq : _this7._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classEqPrefix) : null,
	            bt: hasBetween ? hasCustomCss && typeof prep.css.bt !== 'undefined' ? prep.css.bt : _this7._buildClassName(prep.min[0] + (prep.min[1].percent ? 'pc' : '') + '-' + prep.max[0] + (prep.max[1].percent ? 'pc' : ''), go.classBtPrefix) : null
	          },
	          axis: typeof prep.axis === 'string' && prep.axis.toLowerCase() === 'x' ? 'x' : 'y',
	          applyLt: !hasBetween && typeof prep.applyLt !== 'undefined' ? prep.applyLt : !hasBetween,
	          applyGt: !hasBetween && typeof prep.applyGt !== 'undefined' ? prep.applyGt : !hasBetween,
	          applyEq: !hasBetween && typeof prep.applyEq !== 'undefined' ? prep.applyEq : !hasBetween,
	          applyBt: hasBetween,
	          callbacks: {
	            match: typeof prep.onMatch === 'function' ? prep.onMatch : null,
	            unmatch: typeof prep.onUnmatch === 'function' ? prep.onUnmatch : null,
	            lower: typeof prep.onLower === 'function' ? prep.onLower : null,
	            greater: typeof prep.onGreater === 'function' ? prep.onGreater : null
	          },
	          value: hasValue ? prep.value : null,
	          min: hasBetween ? prep.min : null,
	          max: hasBetween ? prep.max : null
	        };
	      }).filter(function (pObj) {
	        return !!pObj;
	      }) : [];
	    }
	
	    /**
	     * classify
	     * @param domNode
	     * @param value
	     */
	
	  }, {
	    key: 'classify',
	    value: function classify(domNode) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? { absolute: { top: 0, left: 0 }, percent: { top: 0, left: 0 } } : arguments[1];
	
	
	      var bp = this._options.breakpoints;
	      var classes = [];
	
	      /* istanbul ignore if */
	      if (bp.length > 0) {
	        for (var l = bp.length; l; l--) {
	          var _bp = bp[l - 1];
	          var _value = _bp.axis === 'x' ? {
	            absolute: value.absolute.left,
	            percent: value.percent.left
	          } : {
	            absolute: value.absolute.top,
	            percent: value.percent.top
	          };
	
	          // Check lt
	          if (_bp.applyLt && (!_bp.value[1].percent && _value.absolute < _bp.value[0] || _bp.value[1].percent && _value.percent < _bp.value[0])) {
	            classes.push(_bp.css.lt);
	          }
	
	          // Check gt
	          if (_bp.applyGt && (!_bp.value[1].percent && _value.absolute > _bp.value[0] || _bp.value[1].percent && _value.percent > _bp.value[0])) {
	            classes.push(_bp.css.gt);
	          }
	
	          // Check eq
	          if (_bp.applyEq && (!_bp.value[1].percent && _value.absolute === _bp.value[0] || _bp.value[1].percent && _value.percent === _bp.value[0])) {
	            classes.push(_bp.css.eq);
	          }
	
	          // Check between
	          if (_bp.applyBt && (!_bp.min[1].percent && _value.absolute >= _bp.min[0] || _bp.min[1].percent && _value.percent >= _bp.min[0]) && (!_bp.max[1].percent && _value.absolute <= _bp.max[0] || _bp.max[1].percent && _value.percent <= _bp.max[0])) {
	            classes.push(_bp.css.bt);
	          }
	        }
	      }
	
	      this.attachClasses(domNode, classes);
	    }
	
	    /**
	     * _applyCallbacks
	     * @param domNode
	     * @param bps
	     * @param keyword
	     * @private
	     */
	
	  }, {
	    key: '_applyCallbacks',
	    value: function _applyCallbacks(domNode, bps) {
	      var keyword = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	
	      /* istanbul ignore if */
	      if (typeof keyword === 'string' && bps instanceof Array && bps.length > 0) {
	        bps.forEach(function (bp) {
	          if (typeof bp.callbacks[keyword] === 'function') {
	            bp.callbacks[keyword].call(domNode, bp);
	          }
	        });
	      }
	    }
	
	    /**
	     * callbackHandler
	     * @param domNode
	     * @param added
	     * @param removed
	     */
	
	  }, {
	    key: 'callbackHandler',
	    value: function callbackHandler(domNode, added, removed) {
	
	      /* istanbul ignore if */
	      if (added instanceof Array && added.length > 0) {
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['eq', 'bt']), 'match');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['lt']), 'lower');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gt']), 'greater');
	      }
	
	      /* istanbul ignore if */
	      if (removed instanceof Array && removed.length > 0) {
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['eq', 'bt']), 'unmatch');
	      }
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TrackyEvent = function () {
	
	  /**
	   * constructor
	   * @param eventKey
	   * @param tracky
	   * @param options
	   * @param globalOptions
	   */
	
	  function TrackyEvent(eventKey) {
	    var tracky = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var globalOptions = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    _classCallCheck(this, TrackyEvent);
	
	    this._key = eventKey;
	    this._tracky = tracky;
	    this._options = options;
	    this._globalOptions = globalOptions;
	    this._enabled = options.enable;
	
	    this._options.breakpoints = typeof options.breakpoints !== 'undefined' && options.breakpoints instanceof Array ? this._transformBreakpoints(options.breakpoints) : [];
	
	    this._classNames = this._extractClasses();
	
	    this.start();
	  }
	
	  /**
	   * getNodes
	   * @returns {Array}
	   */
	
	
	  _createClass(TrackyEvent, [{
	    key: 'getNodes',
	    value: function getNodes() {
	      return this._tracky && typeof this._tracky._nodes !== 'undefined' ? this._tracky._nodes : [];
	    }
	
	    /**
	     * start
	     */
	
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this._enabled) {
	        this.onStart();
	      }
	    }
	
	    /**
	     * stop
	     */
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this._enabled) {
	        this.onStop();
	      }
	    }
	
	    /**
	     * add
	     * @param nodes
	     */
	
	  }, {
	    key: 'add',
	    value: function add(nodes) {
	      if (this._enabled) {
	        this.onAdd(nodes);
	      }
	    }
	
	    /**
	     * remove
	     * @param nodes
	     */
	
	  }, {
	    key: 'remove',
	    value: function remove(nodes) {
	      if (this._enabled) {
	        this.onRemove(nodes);
	      }
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this._enabled = true;
	      this.start();
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this.stop();
	      this._enabled = false;
	    }
	
	    /**
	     * attachClasses
	     * @param domNode
	     * @param classNames
	     */
	
	  }, {
	    key: 'attachClasses',
	    value: function attachClasses(domNode, classNames) {
	      var _this = this;
	
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
	
	          if (toRemove.length > 0 || toApply.length > 0) {
	            _this.callbackHandler(domNode, toApply, toRemove);
	          }
	        })();
	      }
	    }
	
	    /**
	     * cleanupClasses
	     * @param domNode
	     */
	
	  }, {
	    key: 'cleanupClasses',
	    value: function cleanupClasses(domNode) {
	
	      var available = this._classNames;
	
	      if (domNode.classList) {
	        if (available.length) {
	          for (var l = available.length; l; l--) {
	            domNode.classList.remove(available[l - 1]);
	          }
	        }
	      }
	    }
	
	    /**
	     * _percentRound
	     * @param value
	     * @returns {number}
	     * @private
	     */
	
	  }, {
	    key: '_percentRound',
	    value: function _percentRound(value) {
	      return typeof value === 'number' && !isNaN(value) ? Math.round(parseInt((parseFloat(value) * 100).toFixed(2), 10) / 100) : 0;
	    }
	
	    /**
	     * _transformValue
	     * @param value
	     * @returns {*}
	     * @private
	     */
	
	  }, {
	    key: '_transformValue',
	    value: function _transformValue(value) {
	
	      var t = null;
	
	      if (typeof value === 'number' && !isNaN(value)) {
	        t = [value, { percent: false }];
	      } else if (typeof value === 'string') {
	        t = value.indexOf('%') == value.length - 1 ? [parseInt(value, 10), { percent: true }] : null;
	      } else if (value instanceof Array && value.length === 2 && typeof value[0] === 'number' && !isNaN(value[0]) && !!value[1] && typeof value[1].percent !== 'undefined') {
	        t = value;
	      }
	
	      return t;
	    }
	
	    /**
	     * _extractClasses
	     * @returns {Array}
	     * @private
	     */
	
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
	
	    /**
	     * _buildClassName
	     * @param value
	     * @param modifier
	     * @returns {string}
	     * @private
	     */
	
	  }, {
	    key: '_buildClassName',
	    value: function _buildClassName(value, modifier) {
	      var o = this._globalOptions;
	      return o.classPrefix + this._key + '-' + modifier + value + o.classSuffix;
	    }
	
	    /**
	     * _getBpsByClassName
	     * @param className
	     * @param findIn
	     * @returns {Array | null}
	     * @private
	     */
	
	  }, {
	    key: '_getBpsByClassName',
	    value: function _getBpsByClassName() {
	      var className = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	      var findIn = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	      return className && typeof className === 'string' && this._options.breakpoints instanceof Array && this._options.breakpoints.length && findIn && findIn instanceof Array && findIn.length ? this._options.breakpoints.filter(function (bp) {
	        var cls = [];
	
	        if (findIn instanceof Array && findIn.length) {
	          findIn.forEach(function (operator) {
	            if (typeof bp.css[operator] === 'string') {
	              cls.push(bp.css[operator]);
	            }
	          });
	        }
	
	        return cls.indexOf(className) > -1;
	      }) : null;
	    }
	
	    /**
	     * _getBpsByClassNames
	     * @param classNames
	     * @param findIn
	     * @returns {Array | null}
	     * @private
	     */
	
	  }, {
	    key: '_getBpsByClassNames',
	    value: function _getBpsByClassNames() {
	      var _this2 = this;
	
	      var classNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	      var findIn = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	      if (classNames instanceof Array && classNames.length > 0 && findIn && findIn instanceof Array && findIn.length) {
	        var _ret2 = function () {
	          var bps = [];
	          classNames.forEach(function (cn) {
	            var bp = _this2._getBpsByClassName(cn, findIn);
	            if (bp && bp.length > 0) {
	              bps = bps.concat(bp);
	            }
	          });
	          return {
	            v: bps
	          };
	        }();
	
	        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	      } else {
	        return null;
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracky = __webpack_require__(5);
	
	var _tracky2 = _interopRequireDefault(_tracky);
	
	var _lodash = __webpack_require__(7);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TrackyEdge = function (_TrackyEvent) {
	  _inherits(TrackyEdge, _TrackyEvent);
	
	  function TrackyEdge() {
	    _classCallCheck(this, TrackyEdge);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrackyEdge).apply(this, arguments));
	  }
	
	  _createClass(TrackyEdge, [{
	    key: '_listener',
	
	
	    /**
	     * _listener
	     * @param domNode
	     * @param e
	     * @private
	     */
	    value: function _listener(e) {
	      if (typeof e !== 'undefined' && e && typeof e.target !== 'undefined') {
	        var position = this._getMousePosition(e.target, e);
	        if (position) {
	          this.classify(e.target, position);
	        }
	      }
	    }
	
	    /**
	     * bindEvent
	     * @param domNode
	     */
	
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent(domNode) {
	      var _this2 = this;
	
	      domNode.addEventListener('mousemove', (0, _lodash2.default)(this._bindListener, 100, {
	        leading: true,
	        maxWait: 200,
	        trailing: false
	      }));
	
	      domNode.addEventListener('mouseleave', function (e) {
	        _this2.cleanupClasses(e.target);
	      });
	
	      this._listener(domNode);
	    }
	
	    /**
	     * _getMousePosition
	     * @param domNode
	     * @returns {Object | null}
	     * @private
	     */
	
	  }, {
	    key: '_getMousePosition',
	    value: function _getMousePosition(domNode, e) {
	
	      var boxCoord = typeof domNode !== 'undefined' && domNode && typeof domNode.getBoundingClientRect === 'function' ? domNode.getBoundingClientRect() : null;
	
	      if (!boxCoord) {
	        return null;
	      }
	
	      var clientY = typeof e.clientY !== 'undefined' ? e.clientY : 0;
	      var clientX = typeof e.clientX !== 'undefined' ? e.clientX : 0;
	
	      var absolute = {
	        top: Math.abs(parseInt(clientY - boxCoord.top, 10)),
	        right: Math.abs(parseInt(clientX - boxCoord.left - boxCoord.width, 10)),
	        bottom: Math.abs(parseInt(clientY - boxCoord.top - boxCoord.height, 10)),
	        left: Math.abs(parseInt(clientX - boxCoord.left, 10))
	      };
	
	      var percent = {
	        top: boxCoord.height ? this._percentRound(absolute.top / boxCoord.height * 100) : 0,
	        right: boxCoord.width ? this._percentRound(absolute.right / boxCoord.width * 100) : 0,
	        bottom: boxCoord.height ? this._percentRound(absolute.bottom / boxCoord.height * 100) : 0,
	        left: boxCoord.width ? this._percentRound(absolute.left / boxCoord.width * 100) : 0
	      };
	
	      return {
	        absolute: absolute,
	        percent: percent
	      };
	    }
	
	    /**
	     * unbindEvent
	     * @param domNode
	     */
	
	  }, {
	    key: 'unbindEvent',
	    value: function unbindEvent(domNode) {
	      domNode.removeEventListener('mousemove', this._bindListener);
	    }
	
	    /**
	     * bindEvents
	     */
	
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this3 = this;
	
	      this.getNodes().forEach(function (n) {
	        if (n) {
	          n.forEach(function (_n) {
	            _this3.bindEvent(_n);
	          });
	        }
	      });
	    }
	
	    /**
	     * unbindEvents
	     */
	
	  }, {
	    key: 'unbindEvents',
	    value: function unbindEvents() {
	      var _this4 = this;
	
	      this.getNodes().forEach(function (n) {
	        if (n) {
	          n.forEach(function (_n) {
	            _this4.unbindEvent(_n);
	            _this4.cleanupClasses(_n);
	          });
	        }
	      });
	    }
	
	    /**
	     * onStart
	     */
	
	  }, {
	    key: 'onStart',
	    value: function onStart() {
	      var _this5 = this;
	
	      // Ugly but necessary to keep this-context combined with eventListener add/remove
	      this._bindListener = function (e) {
	        _this5._listener(e);
	      };
	
	      this.bindEvents();
	    }
	
	    /**
	     * onStop
	     */
	
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.unbindEvents();
	    }
	
	    /**
	     * onAdd
	     * @param nodes
	     */
	
	  }, {
	    key: 'onAdd',
	    value: function onAdd(nodes) {
	      var _this6 = this;
	
	      nodes.forEach(function (_n) {
	        _this6.bindEvent(_n);
	      });
	    }
	
	    /**
	     * onRemove
	     * @param nodes
	     */
	
	  }, {
	    key: 'onRemove',
	    value: function onRemove(nodes) {
	      var _this7 = this;
	
	      nodes.forEach(function (_n) {
	        _this7.unbindEvent(_n);
	      });
	    }
	
	    /**
	     * _transformValueMatrix
	     * @param value
	     * @returns {Object | null}
	     * @private
	     */
	
	  }, {
	    key: '_transformValueMatrix',
	    value: function _transformValueMatrix() {
	      var _this8 = this;
	
	      var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      if (value) {
	
	        var master = {
	          top: null,
	          right: null,
	          bottom: null,
	          left: null
	        };
	
	        if (value instanceof Array) {
	
	          value = value.map(function (v) {
	            return _this8._transformValue(v);
	          });
	
	          if (value.length >= 2) {
	            master = {
	              top: value[0],
	              right: value[1],
	              bottom: typeof value[2] !== 'undefined' ? value[2] : value[0],
	              left: typeof value[3] !== 'undefined' ? value[3] : value[1]
	            };
	          } else if (value.length > 0) {
	            master = {
	              top: value[0],
	              right: value[0],
	              bottom: value[0],
	              left: value[0]
	            };
	          }
	        } else if (typeof value === 'number' && !isNaN(value) || typeof value === 'string') {
	          var referenceValue = this._transformValue(value);
	          master = {
	            top: referenceValue,
	            right: referenceValue,
	            bottom: referenceValue,
	            left: referenceValue
	          };
	        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && (typeof value.top !== 'undefined' || typeof value.right !== 'undefined' || typeof value.bottom !== 'undefined' || typeof value.left !== 'undefined')) {
	          master = {
	            top: typeof value.top !== 'undefined' ? this._transformValue(value.top) : null,
	            right: typeof value.right !== 'undefined' ? this._transformValue(value.right) : null,
	            bottom: typeof value.bottom !== 'undefined' ? this._transformValue(value.bottom) : null,
	            left: typeof value.left !== 'undefined' ? this._transformValue(value.left) : null
	          };
	        }
	
	        return master;
	      } else {
	        return null;
	      }
	    }
	
	    /**
	     * _transformBreakpoints
	     * @param bp
	     * @returns {Array|*}
	     * @private
	     */
	
	  }, {
	    key: '_transformBreakpoints',
	    value: function _transformBreakpoints(bp) {
	      var _this9 = this;
	
	      return bp instanceof Array ? bp.filter(function (p) {
	        return typeof p === 'number' && !isNaN(p) || typeof p === 'string' && !isNaN(parseFloat(p)) || p instanceof Array && p.length && p.length <= 4 || (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && p !== null && (typeof p.value !== 'undefined' || typeof p.top !== 'undefined' || typeof p.right !== 'undefined' || typeof p.bottom !== 'undefined' || typeof p.left !== 'undefined');
	      }).map(function (p) {
	
	        var prep = typeof p === 'number' || typeof p === 'string' || p instanceof Array ? {
	          value: p
	        } : p;
	
	        var hasValue = typeof prep.value !== 'undefined' && prep.value;
	
	        var hasCustomCss = typeof prep.css !== 'undefined' && !!prep.css;
	
	        if (hasCustomCss && typeof prep.css === 'string') {
	          prep.css = {
	            top: prep.css,
	            right: prep.css,
	            bottom: prep.css,
	            left: prep.css,
	            topLeft: prep.css,
	            topRight: prep.css,
	            bottomLeft: prep.css,
	            bottomRight: prep.css
	          };
	        }
	
	        if (hasValue) {
	          prep.value = _this9._transformValueMatrix(prep.value);
	          if (!prep.value) {
	            return null;
	          }
	        }
	
	        var applyTop = !!(typeof prep.value.top !== 'undefined' && prep.value.top);
	        var applyRight = !!(typeof prep.value.right !== 'undefined' && prep.value.right);
	        var applyBottom = !!(typeof prep.value.bottom !== 'undefined' && prep.value.bottom);
	        var applyLeft = !!(typeof prep.value.left !== 'undefined' && prep.value.left);
	        var applyTopRight = !!(applyTop && applyRight);
	        var applyTopLeft = !!(applyTop && applyLeft);
	        var applyBottomRight = !!(applyBottom && applyRight);
	        var applyBottomLeft = !!(applyBottom && applyLeft);
	
	        return {
	          css: {
	            top: applyTop ? hasCustomCss && typeof prep.css.top !== 'undefined' ? prep.css.top : _this9._buildClassName(prep.value.top[0] + (prep.value.top[1].percent ? 'pc' : ''), 'top-') : null,
	            right: applyRight ? hasCustomCss && typeof prep.css.right !== 'undefined' ? prep.css.right : _this9._buildClassName(prep.value.right[0] + (prep.value.right[1].percent ? 'pc' : ''), 'right-') : null,
	            bottom: applyBottom ? hasCustomCss && typeof prep.css.bottom !== 'undefined' ? prep.css.bottom : _this9._buildClassName(prep.value.bottom[0] + (prep.value.bottom[1].percent ? 'pc' : ''), 'bottom-') : null,
	            left: applyTop ? hasCustomCss && typeof prep.css.left !== 'undefined' ? prep.css.left : _this9._buildClassName(prep.value.left[0] + (prep.value.left[1].percent ? 'pc' : ''), 'left-') : null,
	            topRight: applyTopRight ? hasCustomCss && typeof prep.css.topRight !== 'undefined' ? prep.css.topRight : _this9._buildClassName(prep.value.top[0] + (prep.value.top[1].percent ? 'pc' : '') + '-' + prep.value.right[0] + (prep.value.right[1].percent ? 'pc' : ''), 'top-right-') : null,
	            topLeft: applyTopLeft ? hasCustomCss && typeof prep.css.topLeft !== 'undefined' ? prep.css.topLeft : _this9._buildClassName(prep.value.top[0] + (prep.value.top[1].percent ? 'pc' : '') + '-' + prep.value.left[0] + (prep.value.left[1].percent ? 'pc' : ''), 'top-left-') : null,
	            bottomLeft: applyBottomLeft ? hasCustomCss && typeof prep.css.bottomLeft !== 'undefined' ? prep.css.bottomLeft : _this9._buildClassName(prep.value.bottom[0] + (prep.value.bottom[1].percent ? 'pc' : '') + '-' + prep.value.left[0] + (prep.value.left[1].percent ? 'pc' : ''), 'bottom-left-') : null,
	            bottomRight: applyBottomRight ? hasCustomCss && typeof prep.css.bottomRight !== 'undefined' ? prep.css.bottomRight : _this9._buildClassName(prep.value.bottom[0] + (prep.value.bottom[1].percent ? 'pc' : '') + '-' + prep.value.right[0] + (prep.value.right[1].percent ? 'pc' : ''), 'bottom-right-') : null
	          },
	          applyTop: applyTop,
	          applyRight: applyRight,
	          applyBottom: applyBottom,
	          applyLeft: applyLeft,
	          applyTopRight: applyTopRight,
	          applyTopLeft: applyTopLeft,
	          applyBottomLeft: applyBottomLeft,
	          applyBottomRight: applyBottomRight,
	          callbacks: {
	            match: typeof prep.onMatch === 'function' ? prep.onMatch : null,
	            unmatch: typeof prep.onUnmatch === 'function' ? prep.onUnmatch : null,
	            matchTop: typeof prep.onMatchTop === 'function' ? prep.onMatchTop : null,
	            matchRight: typeof prep.onMatchRight === 'function' ? prep.onMatchRight : null,
	            matchBottom: typeof prep.onMatchBottom === 'function' ? prep.onMatchBottom : null,
	            matchLeft: typeof prep.onMatchLeft === 'function' ? prep.onMatchLeft : null,
	            matchTopRight: typeof prep.onMatchTopRight === 'function' ? prep.onMatchTopRight : null,
	            matchTopLeft: typeof prep.onMatchTopLeft === 'function' ? prep.onMatchTopLeft : null,
	            matchBottomRight: typeof prep.onMatchBottomRight === 'function' ? prep.onMatchBottomRight : null,
	            matchBottomLeft: typeof prep.onMatchBottomLeft === 'function' ? prep.onMatchBottomLeft : null,
	            unmatchTop: typeof prep.onUnmatchTop === 'function' ? prep.onUnmatchTop : null,
	            unmatchRight: typeof prep.onUnmatchRight === 'function' ? prep.onUnmatchRight : null,
	            unmatchBottom: typeof prep.onUnmatchBottom === 'function' ? prep.onUnmatchBottom : null,
	            unmatchLeft: typeof prep.onUnmatchLeft === 'function' ? prep.onUnmatchLeft : null,
	            unmatchTopRight: typeof prep.onUnmatchTopRight === 'function' ? prep.onUnmatchTopRight : null,
	            unmatchTopLeft: typeof prep.onUnmatchTopLeft === 'function' ? prep.onUnmatchTopLeft : null,
	            unmatchBottomRight: typeof prep.onUnmatchBottomRight === 'function' ? prep.onUnmatchBottomRight : null,
	            unmatchBottomLeft: typeof prep.onUnmatchBottomLeft === 'function' ? prep.onUnmatchBottomLeft : null
	          },
	          value: hasValue ? prep.value : null
	        };
	      }).filter(function (pObj) {
	        return !!pObj;
	      }) : [];
	    }
	
	    /**
	     * classify
	     * @param domNode
	     * @param value
	     */
	
	  }, {
	    key: 'classify',
	    value: function classify(domNode) {
	      var value = arguments.length <= 1 || arguments[1] === undefined ? {
	        absolute: { top: 0, right: 0, bottom: 0, left: 0 },
	        percent: { top: 0, right: 0, bottom: 0, left: 0 }
	      } : arguments[1];
	
	
	      var bp = this._options.breakpoints;
	      var classes = [];
	
	      if (value && bp.length > 0) {
	        for (var l = bp.length; l; l--) {
	          var _bp = bp[l - 1];
	
	          var topMatch = false;
	          var rightMatch = false;
	          var bottomMatch = false;
	          var leftMatch = false;
	
	          // Check top
	          if (_bp.applyTop && (!_bp.value.top[1].percent && value.absolute.top <= _bp.value.top[0] || _bp.value.top[1].percent && value.percent.top <= _bp.value.top[0])) {
	            topMatch = true;
	            classes.push(_bp.css.top);
	          }
	
	          // Check right
	          if (_bp.applyRight && (!_bp.value.right[1].percent && value.absolute.right <= _bp.value.right[0] || _bp.value.right[1].percent && value.percent.right <= _bp.value.right[0])) {
	            rightMatch = true;
	            classes.push(_bp.css.right);
	          }
	
	          // Check bottom
	          if (_bp.applyBottom && (!_bp.value.bottom[1].percent && value.absolute.bottom <= _bp.value.bottom[0] || _bp.value.bottom[1].percent && value.percent.bottom <= _bp.value.bottom[0])) {
	            bottomMatch = true;
	            classes.push(_bp.css.bottom);
	          }
	
	          // Check left
	          if (_bp.applyLeft && (!_bp.value.left[1].percent && value.absolute.left <= _bp.value.left[0] || _bp.value.left[1].percent && value.percent.left <= _bp.value.left[0])) {
	            leftMatch = true;
	            classes.push(_bp.css.left);
	          }
	
	          // Check top right
	          if (_bp.applyTopRight && topMatch && rightMatch) {
	            classes.push(_bp.css.topRight);
	          }
	
	          // Check top left
	          if (_bp.applyTopLeft && topMatch && leftMatch) {
	            classes.push(_bp.css.topLeft);
	          }
	
	          // Check bottom right
	          if (_bp.applyBottomRight && bottomMatch && rightMatch) {
	            classes.push(_bp.css.bottomRight);
	          }
	
	          // Check bottom left
	          if (_bp.applyBottomLeft && bottomMatch && leftMatch) {
	            classes.push(_bp.css.bottomLeft);
	          }
	        }
	      }
	
	      this.attachClasses(domNode, classes);
	    }
	
	    /**
	     * _applyCallbacks
	     * @param domNode
	     * @param bps
	     * @param keyword
	     * @private
	     */
	
	  }, {
	    key: '_applyCallbacks',
	    value: function _applyCallbacks(domNode, bps) {
	      var keyword = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	      if (typeof keyword === 'string' && bps instanceof Array && bps.length > 0) {
	        bps.forEach(function (bp) {
	          if (typeof bp.callbacks[keyword] === 'function') {
	            bp.callbacks[keyword].call(domNode, bp);
	          }
	        });
	      }
	    }
	
	    /**
	     * callbackHandler
	     * @param domNode
	     * @param added
	     * @param removed
	     */
	
	  }, {
	    key: 'callbackHandler',
	    value: function callbackHandler(domNode, added, removed) {
	
	      if (added instanceof Array && added.length > 0) {
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']), 'match');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['top']), 'matchTop');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['right']), 'matchRight');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottom']), 'matchBottom');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['left']), 'matchLeft');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['topRight']), 'matchTopRight');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['topleft']), 'matchTopLeft');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottomRight']), 'matchBottomRight');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottomLeft']), 'matchBottomLeft');
	      }
	
	      if (removed instanceof Array && removed.length > 0) {
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']), 'match');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['top']), 'unmatchTop');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['right']), 'unmatchRight');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['bottom']), 'unmatchBottom');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['left']), 'unmatchLeft');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['topRight']), 'unmatchTopRight');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['topleft']), 'unmatchTopLeft');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['bottomRight']), 'unmatchBottomRight');
	        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['bottomLeft']), 'unmatchBottomLeft');
	      }
	    }
	  }]);
	
	  return TrackyEdge;
	}(_tracky2.default);
	
	exports.default = TrackyEdge;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * lodash 4.0.6 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @type {Function}
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred function to be invoked.
	 */
	var now = Date.now;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime = 0,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (!lastCallTime || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    clearTimeout(timerId);
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastCallTime = lastInvokeTime = 0;
	    lastArgs = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = debounce;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObj = __webpack_require__(9);
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
/* 9 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (x) {
		var type = typeof x;
		return x !== null && (type === 'object' || type === 'function');
	};


/***/ }
/******/ ]);
//# sourceMappingURL=tracky.js.map