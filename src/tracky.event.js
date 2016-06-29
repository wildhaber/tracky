class TrackyEvent {

  /**
   * constructor
   * @param eventKey
   * @param tracky
   * @param options
   * @param globalOptions
   */
  constructor(eventKey, tracky = null, options = {}, globalOptions = {}) {

    this._key = eventKey;
    this._tracky = tracky;
    this._options = options;
    this._globalOptions = globalOptions;

    this._options.breakpoints = this._transformBreakpoints(options.breakpoints);
    this._classNames = this._extractClasses();

    this.start();

  }

  /**
   * getNodes
   * @returns {Array}
   */
  getNodes() {
    return (this._tracky && this._tracky instanceof Tracky) ? this._tracky._nodes : [];
  }

  /**
   * start
   */
  start() {
    this.onStart();
  }

  /**
   * stop
   */
  stop() {
    this.onStop();
  }

  /**
   * add
   * @param nodes
   */
  add(nodes) {
    this.onAdd(nodes);
  }

  /**
   * remove
   * @param nodes
   */
  remove(nodes) {
    this.onRemove(nodes);
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

    if (typeof value === 'number') {
      t = [value, {percent: false}];
    } else if (typeof value === 'string') {
      t = (value.indexOf('%') == (value.length - 1)) ? [parseInt(value, 10), {percent: true}] : null;
    } else {
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

    return bp.map(
      (p) => {

        let go = this._globalOptions;

        let prep = (
          typeof p === 'number' || typeof p === 'string'
        ) ? {
          value: p
        } : p;

        let hasBetween = !(
          typeof prep.min !== 'undefined' &&
          typeof prep.max !== 'undefined'
        ) ? false : ((typeof prep.applyBt !== 'undefined') ? prep.applyBt : true);

        let hasValue = (!hasBetween && typeof prep.value !== 'undefined');

        let hasCustomCss = (typeof prep.css !== 'undefined' && !!prep.css);

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            eq: prep.css,
            bt: prep.css
          }
        }

        if (hasValue) {
          prep.value = this._transformValue(prep.value);
        } else if (hasBetween) {
          prep.min = this._transformValue(prep.min);
          prep.max = this._transformValue(prep.max);
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
          value: (hasValue) ? prep.value : null,
          min: (hasBetween) ? prep.min : null,
          max: (hasBetween) ? prep.max : null,
        }

      }
    )
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
   * attachClasses
   * @param domNode
   * @param classNames
   */
  attachClasses(domNode, classNames) {

    let available = this._classNames;
    let current = domNode.className;


    if (domNode.classList) {

      let applied = current.replace(/\s+/g, ' ').split(' ').filter(
        (c) => {
          return (available.indexOf(c) > -1);
        }
      );

      let toRemove = applied.filter(
        (c) => {
          return (classNames.indexOf(c) === -1);
        }
      );

      let toApply = classNames.filter(
        (c) => {
          return (applied.indexOf(c) === -1);
        }
      );

      if (toRemove.length) {
        for (let l = toRemove.length; l; l--) {
          domNode.classList.remove(toRemove[l - 1]);
        }
      }

      if (toApply.length) {
        for (let l = toApply.length; l; l--) {
          domNode.classList.add(toApply[l - 1]);
        }
      }

    }

  }

  /**
   * cleanupClasses
   * @param domNode
     */
  cleanupClasses(domNode) {

    let available = this._classNames;

    if (domNode.classList) {
      if (available.length) {
        for (let l = available.length; l; l--) {
          domNode.classList.remove(available[l - 1]);
        }
      }

    }
  }

}

export default TrackyEvent;
