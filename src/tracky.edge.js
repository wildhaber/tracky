import TrackyEvent from './tracky.event';
import debounce from 'lodash.debounce';

class TrackyEdge extends TrackyEvent {

  /**
   * _listener
   * @param domNode
   * @param e
   * @private
   */
  _listener(e) {
    if (
      typeof e !== 'undefined' &&
      e &&
      typeof e.target !== 'undefined'
    ) {
      let position = this._getMousePosition(e.target, e);
      if (position) {
        this.classify(e.target, position);
      }
    }
  }

  /**
   * bindEvent
   * @param domNode
   */
  bindEvent(domNode = null) {

    if (
      domNode &&
      typeof domNode.addEventListener === 'function'
    ) {

      domNode.addEventListener(
        'mousemove',
        debounce(
          this._bindListener, 25, {
            leading: true,
            maxWait: 40,
            trailing: false,
          }
        )
      );

      domNode.addEventListener(
        'mouseleave',
        (e) => {
          this.cleanupClasses(e.target);
        }
      );

    }


  }

  /**
   * _getMousePosition
   * @param domNode
   * @returns {Object | null}
   * @private
   */
  _getMousePosition(domNode, e) {

    let boxCoord = (typeof domNode !== 'undefined' && domNode && typeof domNode.getBoundingClientRect === 'function') ? domNode.getBoundingClientRect() : null;

    if (!boxCoord) {
      return null;
    }

    let clientY = (typeof e.clientY !== 'undefined') ? e.clientY : 0;
    let clientX = (typeof e.clientX !== 'undefined') ? e.clientX : 0;

    let absolute = {
      top: Math.abs(parseInt(clientY - boxCoord.top, 10)),
      right: Math.abs(parseInt(clientX - boxCoord.left - boxCoord.width, 10)),
      bottom: Math.abs(parseInt(clientY - boxCoord.top - boxCoord.height, 10)),
      left: Math.abs(parseInt(clientX - boxCoord.left, 10)),
    };

    let percent = {
      top: (boxCoord.height) ? this._percentRound(absolute.top / boxCoord.height * 100) : 0,
      right: (boxCoord.width) ? this._percentRound(absolute.right / boxCoord.width * 100) : 0,
      bottom: (boxCoord.height) ? this._percentRound(absolute.bottom / boxCoord.height * 100) : 0,
      left: (boxCoord.width) ? this._percentRound(absolute.left / boxCoord.width * 100) : 0,
    };

    return {
      absolute: absolute,
      percent: percent,
    };
  }


  /**
   * unbindEvent
   * @param domNode
   */
  unbindEvent(domNode = null) {
    if (
      domNode &&
      typeof domNode.removeEventListener === 'function'
    ) {
      domNode.removeEventListener(
        'mousemove', this._bindListener
      );
    }
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
              this.bindEvent(_n);
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
              this.unbindEvent(_n);
              this.cleanupClasses(_n);
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
      this._listener(e);
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
  onAdd(nodes = null) {
    if (
      nodes &&
      nodes instanceof Array
    ) {
      nodes.forEach(
        (_n) => {
          this.bindEvent(_n);
        }
      );
    }
  }

  /**
   * onRemove
   * @param nodes
   */
  onRemove(nodes = null) {
    if (
      nodes &&
      nodes instanceof Array
    ) {
      nodes.forEach(
        (_n) => {
          this.unbindEvent(_n);
        }
      );
    }
  }


  /**
   * _transformValueMatrix
   * @param value
   * @returns {Object | null}
   * @private
   */
  _transformValueMatrix(value = null) {
    if (value) {

      let master = {
        top: null,
        right: null,
        bottom: null,
        left: null,
      };

      if (value instanceof Array) {

        value = value.map(
          (v) => {
            return this._transformValue(v);
          }
        );

        if (value.length >= 2) {
          master = {
            top: value[0],
            right: value[1],
            bottom: (typeof value[2] !== 'undefined') ? value[2] : value[0],
            left: (typeof value[3] !== 'undefined') ? value[3] : value[1],
          };
        } else if (value.length > 0) {
          master = {
            top: value[0],
            right: value[0],
            bottom: value[0],
            left: value[0],
          };
        }

      } else if (
        typeof value === 'number' && !isNaN(value) ||
        typeof value === 'string'
      ) {
        let referenceValue = this._transformValue(value);
        master = {
          top: referenceValue,
          right: referenceValue,
          bottom: referenceValue,
          left: referenceValue,
        };
      } else if (
        typeof value === 'object' &&
        value &&
        (
          typeof value.top !== 'undefined' ||
          typeof value.right !== 'undefined' ||
          typeof value.bottom !== 'undefined' ||
          typeof value.left !== 'undefined'
        )
      ) {
        master = {
          top: (typeof value.top !== 'undefined') ? this._transformValue(value.top) : null,
          right: (typeof value.right !== 'undefined') ? this._transformValue(value.right) : null,
          bottom: (typeof value.bottom !== 'undefined') ? this._transformValue(value.bottom) : null,
          left: (typeof value.left !== 'undefined') ? this._transformValue(value.left) : null,
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
            p instanceof Array && p.length && p.length <= 4
          ) ||
          (
            typeof p === 'object' &&
            p !== null &&
            (
              typeof p.value !== 'undefined' ||
              (
                typeof p.top !== 'undefined' ||
                typeof p.right !== 'undefined' ||
                typeof p.bottom !== 'undefined' ||
                typeof p.left !== 'undefined'
              )
            )
          )
        );
      }
    ).map(
      (p) => {

        let prep = (
          typeof p === 'number' || typeof p === 'string' || p instanceof Array
        ) ? {
          value: p,
        } : p;

        let hasValue = (typeof prep.value !== 'undefined' && prep.value);

        let hasCustomCss = (typeof prep.css !== 'undefined' && !!prep.css);

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            top: prep.css,
            right: prep.css,
            bottom: prep.css,
            left: prep.css,
            topLeft: prep.css,
            topRight: prep.css,
            bottomLeft: prep.css,
            bottomRight: prep.css,
          };
        }

        if (hasValue) {
          prep.value = this._transformValueMatrix(prep.value);
          if (!prep.value) {
            return null;
          }
        }

        let applyTop = !!(typeof prep.value.top !== 'undefined' && prep.value.top);
        let applyRight = !!(typeof prep.value.right !== 'undefined' && prep.value.right);
        let applyBottom = !!(typeof prep.value.bottom !== 'undefined' && prep.value.bottom);
        let applyLeft = !!(typeof prep.value.left !== 'undefined' && prep.value.left);
        let applyTopRight = !!(applyTop && applyRight);
        let applyTopLeft = !!(applyTop && applyLeft);
        let applyBottomRight = !!(applyBottom && applyRight);
        let applyBottomLeft = !!(applyBottom && applyLeft);

        return {
          css: {
            top: (applyTop) ? (
              (hasCustomCss && typeof prep.css.top !== 'undefined') ?
                prep.css.top :
                this._buildClassName(prep.value.top[0] + ((prep.value.top[1].percent) ? 'pc' : ''), 'top-')
            ) :
              null,
            right: (applyRight) ? (
              (hasCustomCss && typeof prep.css.right !== 'undefined') ?
                prep.css.right :
                this._buildClassName(prep.value.right[0] + ((prep.value.right[1].percent) ? 'pc' : ''), 'right-')
            ) :
              null,
            bottom: (applyBottom) ? (
              (hasCustomCss && typeof prep.css.bottom !== 'undefined') ?
                prep.css.bottom :
                this._buildClassName(prep.value.bottom[0] + ((prep.value.bottom[1].percent) ? 'pc' : ''), 'bottom-')
            ) :
              null,
            left: (applyTop) ? (
              (hasCustomCss && typeof prep.css.left !== 'undefined') ?
                prep.css.left :
                this._buildClassName(prep.value.left[0] + ((prep.value.left[1].percent) ? 'pc' : ''), 'left-')
            ) :
              null,
            topRight: (applyTopRight) ? (
              (hasCustomCss && typeof prep.css.topRight !== 'undefined') ?
                prep.css.topRight :
                this._buildClassName(
                  prep.value.top[0] + ((prep.value.top[1].percent) ? 'pc' : '') + '-' +
                  prep.value.right[0] + ((prep.value.right[1].percent) ? 'pc' : '')
                  , 'top-right-'
                )
            ) :
              null,
            topLeft: (applyTopLeft) ? (
              (hasCustomCss && typeof prep.css.topLeft !== 'undefined') ?
                prep.css.topLeft :
                this._buildClassName(
                  prep.value.top[0] + ((prep.value.top[1].percent) ? 'pc' : '') + '-' +
                  prep.value.left[0] + ((prep.value.left[1].percent) ? 'pc' : '')
                  , 'top-left-'
                )
            ) :
              null,
            bottomLeft: (applyBottomLeft) ? (
              (hasCustomCss && typeof prep.css.bottomLeft !== 'undefined') ?
                prep.css.bottomLeft :
                this._buildClassName(
                  prep.value.bottom[0] + ((prep.value.bottom[1].percent) ? 'pc' : '') + '-' +
                  prep.value.left[0] + ((prep.value.left[1].percent) ? 'pc' : '')
                  , 'bottom-left-'
                )
            ) :
              null,
            bottomRight: (applyBottomRight) ? (
              (hasCustomCss && typeof prep.css.bottomRight !== 'undefined') ?
                prep.css.bottomRight :
                this._buildClassName(
                  prep.value.bottom[0] + ((prep.value.bottom[1].percent) ? 'pc' : '') + '-' +
                  prep.value.right[0] + ((prep.value.right[1].percent) ? 'pc' : '')
                  , 'bottom-right-'
                )
            ) :
              null,
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
            match: (typeof prep.onMatch === 'function') ? prep.onMatch : null,
            unmatch: (typeof prep.onUnmatch === 'function') ? prep.onUnmatch : null,
            matchTop: (typeof prep.onMatchTop === 'function') ? prep.onMatchTop : null,
            matchRight: (typeof prep.onMatchRight === 'function') ? prep.onMatchRight : null,
            matchBottom: (typeof prep.onMatchBottom === 'function') ? prep.onMatchBottom : null,
            matchLeft: (typeof prep.onMatchLeft === 'function') ? prep.onMatchLeft : null,
            matchTopRight: (typeof prep.onMatchTopRight === 'function') ? prep.onMatchTopRight : null,
            matchTopLeft: (typeof prep.onMatchTopLeft === 'function') ? prep.onMatchTopLeft : null,
            matchBottomRight: (typeof prep.onMatchBottomRight === 'function') ? prep.onMatchBottomRight : null,
            matchBottomLeft: (typeof prep.onMatchBottomLeft === 'function') ? prep.onMatchBottomLeft : null,
            unmatchTop: (typeof prep.onUnmatchTop === 'function') ? prep.onUnmatchTop : null,
            unmatchRight: (typeof prep.onUnmatchRight === 'function') ? prep.onUnmatchRight : null,
            unmatchBottom: (typeof prep.onUnmatchBottom === 'function') ? prep.onUnmatchBottom : null,
            unmatchLeft: (typeof prep.onUnmatchLeft === 'function') ? prep.onUnmatchLeft : null,
            unmatchTopRight: (typeof prep.onUnmatchTopRight === 'function') ? prep.onUnmatchTopRight : null,
            unmatchTopLeft: (typeof prep.onUnmatchTopLeft === 'function') ? prep.onUnmatchTopLeft : null,
            unmatchBottomRight: (typeof prep.onUnmatchBottomRight === 'function') ? prep.onUnmatchBottomRight : null,
            unmatchBottomLeft: (typeof prep.onUnmatchBottomLeft === 'function') ? prep.onUnmatchBottomLeft : null,
          },
          value: (hasValue) ? prep.value : null,
        };

      }
    ).filter(
      (pObj) => {
        return !!pObj;
      }
    ) : [];
  }


  /**
   * classify
   * @param domNode
   * @param value
   */
  classify(
    domNode, value = {
      absolute: {top: 0, right: 0, bottom: 0, left: 0},
      percent: {top: 0, right: 0, bottom: 0, left: 0},
    }
  ) {

    let bp = this._options.breakpoints;
    let classes = [];

    if (
      value &&
      bp.length > 0
    ) {
      for (let l = bp.length; l; l--) {
        let _bp = bp[(l - 1)];

        let topMatch = false;
        let rightMatch = false;
        let bottomMatch = false;
        let leftMatch = false;

        // Check top
        if (
          _bp.applyTop &&
          (
            (!_bp.value.top[1].percent && value.absolute.top <= _bp.value.top[0]) ||
            (_bp.value.top[1].percent && value.percent.top <= _bp.value.top[0])
          )
        ) {
          topMatch = true;
          classes.push(_bp.css.top);
        }

        // Check right
        if (
          _bp.applyRight &&
          (
            (!_bp.value.right[1].percent && value.absolute.right <= _bp.value.right[0]) ||
            (_bp.value.right[1].percent && value.percent.right <= _bp.value.right[0])
          )
        ) {
          rightMatch = true;
          classes.push(_bp.css.right);
        }

        // Check bottom
        if (
          _bp.applyBottom &&
          (
            (!_bp.value.bottom[1].percent && value.absolute.bottom <= _bp.value.bottom[0]) ||
            (_bp.value.bottom[1].percent && value.percent.bottom <= _bp.value.bottom[0])
          )
        ) {
          bottomMatch = true;
          classes.push(_bp.css.bottom);
        }

        // Check left
        if (
          _bp.applyLeft &&
          (
            (!_bp.value.left[1].percent && value.absolute.left <= _bp.value.left[0]) ||
            (_bp.value.left[1].percent && value.percent.left <= _bp.value.left[0])
          )
        ) {
          leftMatch = true;
          classes.push(_bp.css.left);
        }

        // Check top right
        if (
          _bp.applyTopRight &&
          (
            topMatch && rightMatch
          )
        ) {
          classes.push(_bp.css.topRight);
        }

        // Check top left
        if (
          _bp.applyTopLeft &&
          (
            topMatch && leftMatch
          )
        ) {
          classes.push(_bp.css.topLeft);
        }

        // Check bottom right
        if (
          _bp.applyBottomRight &&
          (
            bottomMatch && rightMatch
          )
        ) {
          classes.push(_bp.css.bottomRight);
        }

        // Check bottom left
        if (
          _bp.applyBottomLeft &&
          (
            bottomMatch && leftMatch
          )
        ) {
          classes.push(_bp.css.bottomLeft);
        }

      }
    }

    this.attachClasses(domNode, classes);

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
      this._applyCallbacks(
        domNode, this._getBpsByClassNames(
          added, ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']
        ), 'match'
      );
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['top']), 'matchTop');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['right']), 'matchRight');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottom']), 'matchBottom');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['left']), 'matchLeft');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['topRight']), 'matchTopRight');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['topleft']), 'matchTopLeft');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottomRight']), 'matchBottomRight');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottomLeft']), 'matchBottomLeft');
    }

    if (
      removed instanceof Array &&
      removed.length > 0
    ) {
      this._applyCallbacks(
        domNode, this._getBpsByClassNames(
          removed, ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']
        ), 'unmatch'
      );
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


}

export default TrackyEdge;
