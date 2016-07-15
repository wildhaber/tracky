import TrackyEvent from './tracky.event';
import debounce from 'lodash.debounce';

class TrackyOrientation extends TrackyEvent {

  /**
   * _listener
   * @param e
   * @private
   */
  _listener(e) {

    if (
      typeof e !== 'undefined' &&
      e &&
      typeof e.target !== 'undefined'
    ) {
      let orientation = this._getOrientation(e);
      if (orientation) {
        this.classify(orientation);
      }
    }
  }

  /**
   * bindEvent
   * @param domNode
   */
  bindEvent() {

    if (
      typeof window !== 'undefined' &&
      typeof window.DeviceOrientationEvent !== 'undefined'
    ) {
      /* istanbul ignore next */
      window.addEventListener(
        'deviceorientation',
        debounce(
          this._bindListener, 100, {
            leading: true,
            maxWait: 200,
            trailing: true,
          }
        )
      );

    }

  }

  /**
   * _getOrientation
   * @returns {Object | null}
   * @private
   */
  _getOrientation(e = null) {

    if(!e) {
      return null;
    }

    let alpha = (typeof e.alpha !== 'undefined') ? Math.round(e.alpha) : 0;
    let beta = (typeof e.beta !== 'undefined') ? Math.round(e.beta) : 0;
    let gamma = (typeof e.gamma !== 'undefined') ? Math.round(e.gamma) : 0;

    let directionKeys = {
      up: 'up',
      down: 'down',
      left: 'left',
      right: 'right',
      stay: 'stay',
    };

    let absolute = {
      alpha: Math.abs(alpha),
      beta: Math.abs(beta),
      gamma: Math.abs(gamma),
    };

    let percent = {
      alpha: (alpha) ? this._percentRound(Math.abs(alpha) / 360 * 100) : 0,
      beta: (beta) ? this._percentRound(Math.abs(beta) / 180 * 100) : 0,
      gamma: (gamma) ? this._percentRound(Math.abs(gamma) / 90 * 100) : 0,
    };

    let direction = {
      alpha: (alpha > 0) ? directionKeys.left : (alpha < 0) ? directionKeys.right : directionKeys.stay,
      beta: (beta > 0) ? directionKeys.down : (beta < 0) ? directionKeys.up : directionKeys.stay,
      gamma: (gamma > 0) ? directionKeys.right : (gamma < 0) ? directionKeys.left : directionKeys.stay,
    };

    return {
      absolute: absolute,
      percent: percent,
      direction: direction,
    };
  }


  /**
   * unbindEvent
   */
  unbindEvent() {
    if(typeof window !== 'undefined') {
      /* istanbul ignore next */
      window.removeEventListener(
        'deviceorientation', this._bindListener
      );
    }
  }

  /**
   * bindEvents
   */
  bindEvents() {
    this.bindEvent();
  }

  /**
   * unbindEvents
   */
  unbindEvents() {

    this.unbindEvent();

    this.getNodes().forEach(
      (n) => {
        if (n) {
          n.forEach(
            (_n) => {
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
   */
  onAdd() {
    // nothing todo onAdd
  }

  /**
   * onRemove
   * @param nodes
   */
  onRemove(nodes = null) {
    if(
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
        alpha: null,
        beta: null,
        gamma: null,
      };

      if (value instanceof Array) {

        value = value.map(
          (v) => {
            return this._transformValue(v);
          }
        );

        master = {
          alpha: (typeof value[0] !== 'undefined') ? this._transformValue(value[0]) : null,
          beta: (typeof value[1] !== 'undefined') ? this._transformValue(value[1]) : null,
          gamma: (typeof value[2] !== 'undefined') ? this._transformValue(value[2]) : null,
        };

      } else if (
        typeof value === 'number' && !isNaN(value) ||
        typeof value === 'string'
      ) {
        let referenceValue = this._transformValue(value);
        master = {
          alpha: referenceValue,
          beta: referenceValue,
          gamma: referenceValue,
        };
      } else if (
        typeof value === 'object' &&
        value &&
        (
          typeof value.alpha !== 'undefined' ||
          typeof value.beta !== 'undefined' ||
          typeof value.gamma !== 'undefined'
        )
      ) {
        master = {
          alpha: (typeof value.alpha !== 'undefined') ? this._transformValue(value.alpha) : null,
          beta: (typeof value.beta !== 'undefined') ? this._transformValue(value.beta) : null,
          gamma: (typeof value.gamma !== 'undefined') ? this._transformValue(value.gamma) : null,
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
                typeof p.alpha !== 'undefined' ||
                typeof p.beta !== 'undefined' ||
                typeof p.gamma !== 'undefined'
              )
            )
          )
        );
      }
    ).map(
      (p) => {

        let prep = (
          typeof p === 'number' ||
          typeof p === 'string' ||
          p instanceof Array ||
          (
            typeof p === 'object' &&
            p !== null &&
            (
                typeof p.alpha !== 'undefined' ||
                typeof p.beta !== 'undefined' ||
                typeof p.gamma !== 'undefined'
            )
          )
        ) ? {
          value: p,
        } : p;

        let hasValue = (typeof prep.value !== 'undefined' && prep.value);

        let hasCustomCss = (typeof prep.css !== 'undefined' && !!prep.css);

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            alpha: prep.css,
            beta: prep.css,
            gamma: prep.css,
          };
        }

        if (hasValue) {
          prep.value = this._transformValueMatrix(prep.value);
          if (!prep.value) {
            return null;
          }
        }

        let applyAlpha = !!(typeof prep.value.alpha !== 'undefined' && prep.value.alpha);
        let applyBeta = !!(typeof prep.value.beta !== 'undefined' && prep.value.beta);
        let applyGamma = !!(typeof prep.value.gamma !== 'undefined' && prep.value.gamma);

        return {
          css: {
            alpha: (applyAlpha) ? (
              (hasCustomCss && typeof prep.css.alpha !== 'undefined') ?
                prep.css.alpha :
                this._buildClassName(prep.value.alpha[0] + ((prep.value.alpha[1].percent) ? 'pc' : ''), 'alpha-')
            ) :
              null,
            beta: (applyBeta) ? (
              (hasCustomCss && typeof prep.css.beta !== 'undefined') ?
                prep.css.beta :
                this._buildClassName(prep.value.beta[0] + ((prep.value.beta[1].percent) ? 'pc' : ''), 'beta-')
            ) :
              null,
            gamma: (applyGamma) ? (
              (hasCustomCss && typeof prep.css.gamma !== 'undefined') ?
                prep.css.gamma :
                this._buildClassName(prep.value.gamma[0] + ((prep.value.gamma[1].percent) ? 'pc' : ''), 'gamma-')
            ) :
              null,
            alphaLeft: (applyAlpha) ? (
              (hasCustomCss && typeof prep.css.alphaLeft !== 'undefined') ?
                prep.css.alphaLeft :
                this._buildClassName(prep.value.alpha[0] + ((prep.value.alpha[1].percent) ? 'pc' : ''), 'alpha-left-')
            ) :
              null,
            alphaRight: (applyAlpha) ? (
              (hasCustomCss && typeof prep.css.alphaRight !== 'undefined') ?
                prep.css.alphaRight :
                this._buildClassName(prep.value.alpha[0] + ((prep.value.alpha[1].percent) ? 'pc' : ''), 'alpha-right-')
            ) :
              null,
            betaUp: (applyBeta) ? (
              (hasCustomCss && typeof prep.css.betaUp !== 'undefined') ?
                prep.css.betaUp :
                this._buildClassName(prep.value.beta[0] + ((prep.value.beta[1].percent) ? 'pc' : ''), 'beta-up-')
            ) :
              null,
            betaDown: (applyBeta) ? (
              (hasCustomCss && typeof prep.css.betaDown !== 'undefined') ?
                prep.css.betaDown :
                this._buildClassName(prep.value.beta[0] + ((prep.value.beta[1].percent) ? 'pc' : ''), 'beta-down-')
            ) :
              null,
            gammaLeft: (applyGamma) ? (
              (hasCustomCss && typeof prep.css.gammaLeft !== 'undefined') ?
                prep.css.gammaLeft :
                this._buildClassName(prep.value.gamma[0] + ((prep.value.gamma[1].percent) ? 'pc' : ''), 'gamma-left-')
            ) :
              null,
            gammaRight: (applyGamma) ? (
              (hasCustomCss && typeof prep.css.gammaRight !== 'undefined') ?
                prep.css.gammaRight :
                this._buildClassName(prep.value.gamma[0] + ((prep.value.gamma[1].percent) ? 'pc' : ''), 'gamma-right-')
            ) :
              null,
          },
          applyAlpha: applyAlpha,
          applyBeta: applyBeta,
          applyGamma: applyGamma,
          callbacks: {
            match: (typeof prep.onMatch === 'function') ? prep.onMatch : null,
            unmatch: (typeof prep.onUnmatch === 'function') ? prep.onUnmatch : null,
            matchAlpha: (typeof prep.onMatchAlpha === 'function') ? prep.onMatchAlpha : null,
            matchBeta: (typeof prep.onMatchBeta === 'function') ? prep.onMatchBeta : null,
            matchGamma: (typeof prep.onMatchGamma === 'function') ? prep.onMatchGamma : null,
            matchAlphaLeft: (typeof prep.onMatchAlphaLeft === 'function') ? prep.onMatchAlphaLeft : null,
            matchAlphaRight: (typeof prep.onMatchAlphaRight === 'function') ? prep.onMatchAlphaRight : null,
            matchBetaUp: (typeof prep.onMatchBetaUp === 'function') ? prep.onMatchBetaUp : null,
            matchBetaDown: (typeof prep.onMatchBetaDown === 'function') ? prep.onMatchBetaDown : null,
            matchGammaLeft: (typeof prep.onMatchGammaLeft === 'function') ? prep.onMatchGammaLeft : null,
            matchGammaRight: (typeof prep.onMatchGammaRight === 'function') ? prep.onMatchGammaRight : null,
            unmatchAlpha: (typeof prep.onUnmatchAlpha === 'function') ? prep.onUnmatchAlpha : null,
            unmatchBeta: (typeof prep.onUnmatchBeta === 'function') ? prep.onUnmatchBeta : null,
            unmatchGamma: (typeof prep.onUnmatchGamma === 'function') ? prep.onUnmatchGamma : null,
            unmatchAlphaLeft: (typeof prep.onUnmatchAlphaLeft === 'function') ? prep.onUnmatchAlphaLeft : null,
            unmatchAlphaRight: (typeof prep.onUnmatchAlphaRight === 'function') ? prep.onUnmatchAlphaRight : null,
            unmatchBetaUp: (typeof prep.onUnmatchBetaUp === 'function') ? prep.onUnmatchBetaUp : null,
            unmatchBetaDown: (typeof prep.onUnmatchBetaDown === 'function') ? prep.onUnmatchBetaDown : null,
            unmatchGammaLeft: (typeof prep.onUnmatchGammaLeft === 'function') ? prep.onUnmatchGammaLeft : null,
            unmatchGammaRight: (typeof prep.onUnmatchGammaRight === 'function') ? prep.onUnmatchGammaRight : null,
          },
          value: (hasValue) ? prep.value : null,
        };

      }
    ).filter(
      (pObj) => {
        return !!pObj && pObj.value;
      }
    ) : [];
  }


  /**
   * classify
   * @param value
   */
  classify(
    value = {
      absolute: {alpha: 0, beta: 0, gamma: 0},
      percent: {alpha: 0, beta: 0, gamma: 0},
      direction: {alpha: 'stay', beta: 'stay', gamma: 'stay'},
    }
  ) {

    let bp = this._options.breakpoints;
    let classes = [];
    let nodes = this._tracky._flattenNodes(this.getNodes());

    if (
      value &&
      bp.length > 0 &&
      nodes instanceof Array &&
      nodes.length > 0
    ) {
      for (let l = bp.length; l; l--) {
        let _bp = bp[(l - 1)];

        // Check alpha
        if (
          _bp.applyAlpha &&
          (
            (!_bp.value.alpha[1].percent && value.absolute.alpha >= _bp.value.alpha[0]) ||
            (_bp.value.alpha[1].percent && value.percent.alpha >= _bp.value.alpha[0])
          )
        ) {
          classes.push(_bp.css.alpha);

          switch (value.direction.alpha) {
          case 'left' :
            classes.push(_bp.css.alphaLeft);
            break;
          case 'right' :
            classes.push(_bp.css.alphaRight);
            break;
          }

        }

        // Check beta
        if (
          _bp.applyBeta &&
          (
            (!_bp.value.beta[1].percent && value.absolute.beta >= _bp.value.beta[0]) ||
            (_bp.value.beta[1].percent && value.percent.beta >= _bp.value.beta[0])
          )
        ) {
          classes.push(_bp.css.beta);
          switch (value.direction.beta) {
          case 'up' :
            classes.push(_bp.css.betaUp);
            break;
          case 'down' :
            classes.push(_bp.css.betaDown);
            break;
          }
        }

        // Check gamma
        if (
          _bp.applyGamma &&
          (
            (!_bp.value.gamma[1].percent && value.absolute.gamma >= _bp.value.gamma[0]) ||
            (_bp.value.gamma[1].percent && value.percent.gamma >= _bp.value.gamma[0])
          )
        ) {
          classes.push(_bp.css.gamma);
          switch (value.direction.gamma) {
          case 'left' :
            classes.push(_bp.css.gammaLeft);
            break;
          case 'right' :
            classes.push(_bp.css.gammaRight);
            break;
          }
        }

      }
    }

    if (
      nodes instanceof Array &&
      nodes.length > 0
    ) {
      nodes.forEach(
        (domNode) => {
          this.attachClasses(domNode, classes);
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
      this._applyCallbacks(
        domNode, this._getBpsByClassNames(
          added, ['alpha', 'beta', 'gamma', 'alphaLeft', 'alphaRight', 'betaUp', 'betaDown', 'gammaLeft', 'gammaRight']
        ), 'match'
      );
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alpha']), 'matchAlpha');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['beta']), 'matchBeta');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gamma']), 'matchGamma');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alphaLeft']), 'matchAlphaLeft');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alphaRight']), 'matchAlphaRight');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['betaUp']), 'matchBetaUp');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['betaDown']), 'matchBetaDown');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gammaLeft']), 'matchGammaLeft');
      this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gammaRight']), 'matchGammaRight');
    }

    if (
      removed instanceof Array &&
      removed.length > 0
    ) {
      this._applyCallbacks(
        domNode, this._getBpsByClassNames(
          removed,
          ['alpha', 'beta', 'gamma', 'alphaLeft', 'alphaRight', 'betaUp', 'betaDown', 'gammaLeft', 'gammaRight']
        ), 'unmatch'
      );
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alpha']), 'unmatchAlpha');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['beta']), 'unmatchBeta');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['gamma']), 'unmatchGamma');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alphaLeft']), 'unmatchAlphaLeft');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alphaRight']), 'unmatchAlphaRight');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['betaUp']), 'unmatchBetaUp');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['betaDown']), 'unmatchBetaDown');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['gammaLeft']), 'unmatchGammaLeft');
      this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['gammaRight']), 'unmatchGammaRight');
    }

  }


}

export default TrackyOrientation;
