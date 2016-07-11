import TrackyEvent from './tracky.event';

class TrackyScroll extends TrackyEvent {

  /**
   * _listener
   * @param domNode
   * @private
   */
  _listener(domNode) {

    let position = this._getScrollPosition(domNode);

    this.classify(
      domNode, {
        absolute: position.absolute.top,
        percent: position.percent.top
      }
    );

  }

  /**
   * bindEvent
   * @param domNode
   */
  bindEvent(domNode) {

    domNode.addEventListener(
      'scroll',
      this._bindListener
    );

    this._listener(domNode);

  }

  /**
   * _percentRound
   * @param value
   * @returns {number}
   * @private
   */
  _percentRound(value) {
    return (typeof value === 'number' && !isNaN(value)) ? Math.round(
      parseInt((parseFloat(value) * 100).toFixed(2), 10) / 100
    ) : 0;
  }

  /**
   * _getScrollPosition
   * @param domNode
   * @returns {*}
   * @private
   */
  _getScrollPosition(domNode) {
    if (this._isBody(domNode)) {

      let doc = document.documentElement;
      let b = document.body;

      return {
        absolute: {
          top: doc.scrollTop || b.scrollTop,
          left: doc.scrollLeft || b.scrollLeft,
        },
        percent: {
          top: this._percentRound(
            doc.scrollTop || b.scrollTop / ((doc.scrollHeight || b.scrollHeight) - doc.clientHeight)
          ),
          left: this._percentRound(
            (!!doc.scrollLeft || !!b.scrollLeft) ? (doc.scrollLeft || b.scrollLeft / ((doc.scrollWidth || b.scrollWidth) - doc.clientWidth)) : 0
          ),
        }
      };

    } else {
      return {
        absolute: {
          top: domNode.scrollTop,
          left: domNode.scrollLeft,
        },
        percent: {
          top: this._percentRound(((domNode.scrollTop) / (domNode.scrollHeight - domNode.offsetHeight))),
          left: this._percentRound(
            (domNode.scrollLeft) ? ((domNode.scrollLeft) / (domNode.scrollWidth - domNode.offsetWidth)) : 0
          ),
        }
      };
    }
  }

  /**
   * bindBodyEvent
   */
  bindBodyEvent() {

    window.addEventListener(
      'scroll', this._bindBodyListener
    );

    this._listener(document.body);

  }

  /**
   * unbindBodyEvent
   */
  unbindBodyEvent() {
    window.removeEventListener(
      'scroll',
      this._bindBodyListener
    );

  }

  /**
   * unbindEvent
   * @param domNode
   */
  unbindEvent(domNode) {
    domNode.removeEventListener(
      'scroll', this._bindListener
    );
  }

  /**
   * _isBody
   * @param domNode
   * @returns {boolean}
   * @private
   */
  _isBody(domNode) {
    return (
      !!domNode && typeof domNode.nodeName &&
      domNode.nodeName === 'BODY'
    );
  }

  /**
   * bindEvents
   */
  bindEvents() {

    this.getNodes().forEach(
      (n) => {
        if (n) {
          n.forEach(
            (_n) => {
              if (this._isBody(_n)) {
                this.bindBodyEvent();
              } else {
                this.bindEvent(_n);
              }
            }
          );
        }
      }
    );
  }

  /**
   * unbindEvents
   */
  unbindEvents() {

    this.getNodes().forEach(
      (n) => {
        if (n) {
          n.forEach(
            (_n) => {
              if (this._isBody(_n)) {
                this.unbindBodyEvent();
                this.cleanupClasses(document.body);
              } else {
                this.unbindEvent(_n);
                this.cleanupClasses(_n);
              }
            }
          );
        }
      }
    );
  }


  /**
   * onStart
   */
  onStart() {

    // Ugly but necessary to keep this-context combined with eventListener add/remove
    this._bindListener = (e) => {
      this._listener(e.target);
    };

    // It becomes even worse if we consider that body/window needs a separate handling
    // but necessary to keep this-context combined with eventListener add/remove
    var last_known_scroll_position = 0; // eslint-disable-line no-unused-vars
    var ticking = false;

    this._bindBodyListener = (e) => {

      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(
          () => {
            this._listener(e.target.activeElement);
            ticking = false;
          }
        );
      }

      ticking = true;

    };

    this.bindEvents();

  }

  /**
   * onStop
   */
  onStop() {
    this.unbindEvents();
  }

  /**
   * onAdd
   * @param nodes
   */
  onAdd(nodes) {
    nodes.forEach(
      (_n) => {
        if (this._isBody(_n)) {
          this.bindBodyEvent();
        } else {
          this.bindEvent(_n);
        }
      }
    );
  }

  /**
   * onRemove
   * @param nodes
   */
  onRemove(nodes) {

    nodes.forEach(
      (_n) => {
        if (this._isBody(_n)) {
          this.unbindBodyEvent();
        } else {
          this.unbindEvent(_n);
        }
      }
    );
  }


  /**
   * _buildClassName
   * @param value
   * @param modifier
   * @returns {string}
   * @private
   */
  _buildClassName(value, modifier) {
    let o = this._globalOptions;
    return o.classPrefix + this._key + '-' + modifier + value + o.classSuffix;
  }

  /**
   * _transformValue
   * @param value
   * @returns {*}
   * @private
   */
  _transformValue(value) {

    let t = null;

    if (
      typeof value === 'number' && !isNaN(value)
    ) {
      t = [value, {percent: false}];
    } else if (typeof value === 'string') {
      t = (value.indexOf('%') == (value.length - 1)) ? [parseInt(value, 10), {percent: true}] : null;
    } else if (
      value instanceof Array &&
      value.length === 2 &&
      typeof value[0] === 'number' && !isNaN(value[0]) && !!value[1] &&
      typeof value[1].percent !== 'undefined'
    ) {
      t = value;
    }

    return t;
  }

  /**
   * _transformBreakpoints
   * @param bp
   * @returns {Array|*}
   * @private
   */
  _transformBreakpoints(bp) {

    return (bp instanceof Array) ? bp.filter(
      (p) => {
        return (
          (
            typeof p === 'number' && !isNaN(p)
          ) ||
          (
            typeof p === 'string' && !isNaN(parseFloat(p))
          ) ||
          (
            typeof p === 'object' &&
            p !== null &&
            (typeof p.value !== 'undefined' ||
              (
                typeof p.min !== 'undefined' &&
                typeof p.max !== 'undefined'
              )
            )
          )
        );
      }
    ).map(
      (p) => {

        let go = this._globalOptions;

        let prep = (
          typeof p === 'number' || typeof p === 'string'
        ) ? {
          value: p
        } : p;

        let hasBetween = (
          typeof prep.min === 'undefined' ||
          typeof prep.max === 'undefined'
        ) ? false : ((typeof prep.applyBt !== 'undefined') ? prep.applyBt : true);

        let hasValue = (!hasBetween && typeof prep.value !== 'undefined');

        let hasCustomCss = (typeof prep.css !== 'undefined' && !!prep.css);

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            eq: prep.css,
            bt: prep.css
          };
        }

        if (hasValue) {
          prep.value = this._transformValue(prep.value);
          if (!prep.value) {
            return null;
          }
        } else if (hasBetween) {
          prep.min = this._transformValue(prep.min);
          prep.max = this._transformValue(prep.max);
          if (!prep.min || !prep.max) {
            return null;
          }
        }

        return {
          css: {
            lt: (!hasBetween) ? (
              (hasCustomCss && typeof prep.css.lt !== 'undefined') ? prep.css.lt : this._buildClassName(
                prep.value[0] + ((prep.value[1].percent) ? 'pc' : ''), go.classLtPrefix
              )) : null,
            gt: (!hasBetween) ? (
              (hasCustomCss && typeof prep.css.gt !== 'undefined') ? prep.css.gt : this._buildClassName(
                prep.value[0] + ((prep.value[1].percent) ? 'pc' : ''), go.classGtPrefix
              )) : null,
            eq: (!hasBetween) ? (
              (hasCustomCss && typeof prep.css.eq !== 'undefined') ? prep.css.eq : this._buildClassName(
                prep.value[0] + ((prep.value[1].percent) ? 'pc' : ''), go.classEqPrefix
              )) : null,
            bt: (hasBetween) ? (
              (hasCustomCss && typeof prep.css.bt !== 'undefined') ? prep.css.bt : this._buildClassName(
                prep.min[0] + ((prep.min[1].percent) ? 'pc' : '') + '-' + prep.max[0] + ((prep.max[1].percent) ? 'pc' : ''),
                go.classBtPrefix
              )) : null,
          },
          applyLt: (!hasBetween && typeof prep.applyLt !== 'undefined') ? prep.applyLt : !hasBetween,
          applyGt: (!hasBetween && typeof prep.applyGt !== 'undefined') ? prep.applyGt : !hasBetween,
          applyEq: (!hasBetween && typeof prep.applyEq !== 'undefined') ? prep.applyEq : !hasBetween,
          applyBt: hasBetween,
          callbacks: {
            match: (typeof prep.onMatch === 'function') ? prep.onMatch : null,
            unmatch: (typeof prep.onUnmatch === 'function') ? prep.onUnmatch : null,
            lower: (typeof prep.onLower === 'function') ? prep.onLower : null,
            greater: (typeof prep.onGreater === 'function') ? prep.onGreater : null,
          },
          value: (hasValue) ? prep.value : null,
          min: (hasBetween) ? prep.min : null,
          max: (hasBetween) ? prep.max : null,
        };

      }
    ).filter(
      (pObj) => {
        return !!pObj;
      }
    ) : [];
  }

  /**
   * _extractClasses
   * @returns {Array}
   * @private
   */
  _extractClasses() {
    let bps = this._options.breakpoints;
    let classArray = [];

    bps.forEach(
      (bp) => {
        for (let c in bp.css) {
          if (bp.css[c]) {
            classArray.push(bp.css[c]);
          }
        }
      }
    );

    return classArray;
  }

  /**
   * classify
   * @param domNode
   * @param value
   */
  classify(domNode, value = {absolute: 0, percent: 0}) {

    let bp = this._options.breakpoints;
    let classes = [];

    if (bp.length > 0) {
      for (let l = bp.length; l; l--) {
        let _bp = bp[(l - 1)];

        // Check lt
        if (
          _bp.applyLt &&
          (
            (!_bp.value[1].percent && value.absolute < _bp.value[0]) ||
            (_bp.value[1].percent && value.percent < _bp.value[0])
          )
        ) {
          classes.push(_bp.css.lt);
        }

        // Check gt
        if (
          _bp.applyGt &&
          (
            (!_bp.value[1].percent && value.absolute > _bp.value[0]) ||
            (_bp.value[1].percent && value.percent > _bp.value[0])
          )
        ) {
          classes.push(_bp.css.gt);
        }

        // Check eq
        if (
          _bp.applyEq &&
          (
            (!_bp.value[1].percent && value.absolute === _bp.value[0]) ||
            (_bp.value[1].percent && value.percent === _bp.value[0])
          )
        ) {
          classes.push(_bp.css.eq);
        }

        // Check between
        if (
          _bp.applyBt &&
          (
            (
              (!_bp.min[1].percent && value.absolute >= _bp.min[0]) ||
              (_bp.min[1].percent && value.percent >= _bp.min[0])
            ) &&
            (
              (!_bp.max[1].percent && value.absolute <= _bp.max[0]) ||
              (_bp.max[1].percent && value.percent <= _bp.max[0])
            )
          )
        ) {
          classes.push(_bp.css.bt);
        }

      }
    }

    this.attachClasses(domNode, classes);

  }

  /**
   * _getBpsByClassName
   * @param className
   * @param findIn
   * @returns {Array | null}
   * @private
   */
  _getBpsByClassName(className = null, findIn = ['eq', 'bt']) {
    return (
      className &&
      typeof className === 'string' &&
      this._options.breakpoints instanceof Array &&
      this._options.breakpoints.length &&
      findIn &&
      findIn instanceof Array &&
      findIn.length
    ) ?
      this._options.breakpoints.filter(
        (bp) => {
          let cls = [];

          if (
            findIn instanceof Array &&
            findIn.length
          ) {
            findIn.forEach(
              (operator) => {
                if (typeof bp.css[operator] === 'string') {
                  cls.push(bp.css[operator]);
                }
              }
            );
          }

          return cls.indexOf(className) > -1;

        }
      ) : null;
  }

  /**
   * _getBpsByClassNames
   * @param classNames
   * @param findIn
   * @returns {Array | null}
   * @private
   */
  _getBpsByClassNames(classNames = [], findIn = ['eq', 'bt']) {
    if (
      classNames instanceof Array &&
      classNames.length > 0 &&
      findIn &&
      findIn instanceof Array &&
      findIn.length
    ) {
      let bps = [];
      classNames.forEach(
        (cn) => {
          let bp = this._getBpsByClassName(cn, findIn);
          if (bp && bp.length > 0) {
            bps = bps.concat(bp);
          }
        }
      );
      return bps;
    } else {
      return null;
    }
  }

  /**
   * _applyCallbacks
   * @param domNode
   * @param bps
   * @param keyword
   * @private
   */
  _applyCallbacks(domNode, bps, keyword = null) {
    if (
      typeof keyword === 'string' &&
      bps instanceof Array &&
      bps.length > 0
    ) {
      bps.forEach(
        (bp) => {
          if (typeof bp.callbacks[keyword] === 'function') {
            bp.callbacks[keyword].call(domNode, bp);
          }
        }
      );
    }
  }

  /**
   * callbackHandler
   * @param domNode
   * @param added
   * @param removed
   */
  callbackHandler(domNode, added, removed) {

    if (
      added instanceof Array &&
      added.length > 0
    ) {
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['eq', 'bt']), 'match');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['lt']), 'lower');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gt']), 'greater');
    }

    if (
      removed instanceof Array &&
      removed.length > 0
    ) {
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['eq', 'bt']), 'unmatch');
    }

  }


}

export default TrackyScroll;
