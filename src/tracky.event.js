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
