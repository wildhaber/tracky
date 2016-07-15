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
    this._enabled = options.enable;

    this._options.breakpoints = (
      typeof options.breakpoints !== 'undefined' &&
      options.breakpoints instanceof Array
    ) ? this._transformBreakpoints(
      options.breakpoints
    ) : [];

    this._classNames = this._extractClasses();

    this.start();

  }

  /**
   * getNodes
   * @returns {Array}
   */
  getNodes() {
    return (this._tracky && typeof this._tracky._nodes !== 'undefined') ? this._tracky._nodes : [];
  }

  /**
   * start
   */
  start() {
    if (this._enabled) {
      this.onStart();
    }
  }

  /**
   * stop
   */
  stop() {
    if (this._enabled) {
      this.onStop();
    }
  }

  /**
   * add
   * @param nodes
   */
  add(nodes) {
    if (this._enabled) {
      this.onAdd(nodes);
    }
  }

  /**
   * remove
   * @param nodes
   */
  remove(nodes) {
    if (this._enabled) {
      this.onRemove(nodes);
    }
  }

  enable() {
    this._enabled = true;
    this.start();
  }

  disable() {
    this.stop();
    this._enabled = false;
  }

  /**
   * attachClasses
   * @param domNode
   * @param classNames
   */
  attachClasses(domNode, classNames) {

    if (
      typeof domNode === 'undefined' ||
      typeof classNames === 'undefined' ||
      !classNames instanceof Array
    ) {
      return;
    }

    let available = this._classNames;
    let current = domNode.className;

    if (
      typeof domNode.classList !== 'undefined'
    ) {

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

      if (
        (
          toRemove.length > 0 ||
          toApply.length > 0
        ) &&
        typeof this.callbackHandler === 'function'
      ) {
        this.callbackHandler(domNode, toApply, toRemove);
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
   * _getBpsByClassName
   * @param className
   * @param findIn
   * @returns {Array | null}
   * @private
   */
  _getBpsByClassName(className = null, findIn = []) {
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
  _getBpsByClassNames(classNames = [], findIn = []) {
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

}

export default TrackyEvent;
