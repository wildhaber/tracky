# tracky.js
[![CircleCI](https://circleci.com/gh/wildhaber/tracky/tree/master.svg?style=svg&circle-token=98f9cc03cf867906c42e92903c8afd2072651d91)](https://circleci.com/gh/wildhaber/tracky/tree/master)

tracky.js is a helper streamlining user interaction into css-classes. This means tracky transforms user interaction like scrolling, device orientation changes or cursor movements on defined breakpoints into css classes.

## Install && Getting started

**Installation**
```cli
npm install tracky --save
```

Example **ES2015**:
```javascript
import Tracky from 'tracky';

let bodyTracker = new Tracky('body', { options: 'example' });
```

Example **ES5**:
```html
<script src='../your-path-to-the-file/tracky/dist/tracky.min.js'>
```
```javascript
<script>
  var _Tracky = Tracky.default;
  var bodyTracker = new _Tracky('body', { options: 'example' });
</script>
```

## Documentation

#### Tracky

`Tracky( selector, { options } )`

**Arguments**

  1. selector (String | Array | _default: 'body'_) - selector or array of strings that fits into `querySelectAll()`.
  2. options (Object | _default: null_) - options for your Tracky instance

**Returns**

Tracky instance

**Example**

```javascript

 // apply trackers to body
new Tracky('body');

// apply trackers to .selector1 and .selector2
new Tracky(['.selector1', '.selector2']);

// apply trackers to any div with the default options
new Tracky('div', {
 classPrefix: 'tracky-',
 classSuffix: '',
 classGtPrefix: 'gt-',
 classLtPrefix: 'lt-',
 classEqPrefix: 'eq-',
 classBtPrefix: 'bt-',
 events: {
   scroll: {
     enable: false,
     breakpoints: []
   },
   edge: {
     enable: false,
     breakpoints: []
   },
   orientation: {
     enable: false,
     breakpoints: []
   }
 }
});

```

---

#### Tracky.addSelector()

> Adds one or many selector to the existing selectors and attach events.

`.addSelector( selector )`

**Arguments**

  1. selector (String | Array) - selector or array of strings that fits into `querySelectAll()`.

**Returns**

Tracky instance

**Example**

```javascript

 // apply trackers to body
let t = new Tracky('body');

// add .selector1 and .selector2
t.addSelector(['.selector1', '.selector2']);

// add #single-selector
t.addSelector('#single-selector');

```

---

#### Tracky.removeSelector()

> Removes one or many selector from the existing selectors and unbind events.

`.removeSelector( selector )`

**Arguments**

  1. selector (String | Array) - selector or array of selectors that are currently added to the instance.

**Returns**

Tracky instance

**Example**

```javascript

 // apply trackers
let t = new Tracky(['body','.s2','.s3','#s4']);

// remove .s2 and .s3
t.removeSelector(['.s2', '.s3']);

// remove #s4
t.removeSelector('#s4');

```

---

#### Tracky.disable()

> Disables a given tracker and unbind the event listeners.

`.disable( tracker )`

**Arguments**

  1. tracker (String) - tracker as a string that is currently enabled.

**Returns**

Tracky instance

**Example**

```javascript

 // apply events to body
let t = new Tracky(['body'], {
	events : {
      scroll : {
      	enable: true,
        breakpoints: [255, '99%']
      }
    }
});

// disabling scroll events
t.disable('scroll');

```

---

#### Tracky.enable()

> Enables a given event and unbind the event listeners.

`.enable( tracker )`

**Arguments**

  1. tracker (String) - tracker as a string from the listeners.

**Returns**

Tracky instance

**Example**

```javascript

 // apply events to body
let t = new Tracky(['body'], {
	events : {
      orientation : {
      	enable: false,
        breakpoints: [255, '99%']
      }
    }
});

// enabling orientation events
t.enable('orientation');

```

---

### Event Options

#### scroll

> Tracks horizontal and vertical scroll.

![scroll tracker demo](/docs/img/scroll-tracker-demo.gif?raw=true "scroll tracker in action")

---

![scroll tracker demo console](/docs/img/scroll-tracker-demo-console.gif?raw=true "scroll tracker in action console")
_(Notice: console recording and demo above are not synced)_

**Default classNames**

If no custom css class-name is defined. Tracky creates a unique name by the given values by default. Note that the %-digit will be replaced by 'pc' (percent).

```javascript
// value: [value]
[options.classPrefix]['scroll'][options.classLtPrefix][value][options.classSuffix] // when lower than [value]
[options.classPrefix]['scroll'][options.classGtPrefix][value][options.classSuffix] // when greater than [value]
[options.classPrefix]['scroll'][options.classEqPrefix][value][options.classSuffix] // when equal than [value]
```

```javascript
// value: { min, max } // as a range
[options.classPrefix]['scroll'][options.classBtPrefix]{min}['-']{max}[options.classSuffix] // when between {min} and {max}
```

```javascript
// value: 50
tracky-scroll-lt-50 // when lower than 50px
tracky-scroll-gt-50 // when greater than 50px
tracky-scroll-eq-50 // when equal than 50px
```

```javascript
// value: 77%
tracky-scroll-lt-77pc // when lower than 77%
tracky-scroll-gt-77pc // when greater than 77%
tracky-scroll-eq-77pc // when equal than 77%
```

```javascript
// min: 5% / max: 200
tracky-scroll-bt-5pc-200 // when between 5% and 200 pixel
```

**Example configuration:**

```javascript
{
  events: {
    scroll: {
      /* Enable the scroll tracker */
      enable: true,
      /* Array with breakpoints */
      breakpoints: [
        /* Breakpoints can be set as a single number */
        0,
        /* Breakpoint can be set as percentage */
        '50%',
        /* Breakpoint set as object with property value given */
        {value: '99%'},
        /* Breakpoint set as object with min and max property */
        {min: 60, max: '40%'},
        /* CSS class as a string will be applied when between 40% and 60% */
        {
          css: 'element-scroll-is-in-range',
          min: '40%',
          max: '60%'
        },
        /* complex custom breakpoint example */
        {
          /* css as an object */
          css: {
            /* class applied when scroll < value */
            lt: 'this-is-my-special-class-under-350',
            /* class applied when scroll > value */
            gt: 'this-is-my-special-class-over-350',
            /* class applied when scroll === value */
            eq: 'this-is-my-special-class-at-350'
          },
          /* scroll direction measured ['x' | 'y'] (x = horizontal / y = vertical) (Default: 'y') */
          axis: 'x',
          /* Breakpoint as value */
          value: 350,
          /* Callback when 'eq' -> scroll === value | min-max-range */
          onMatch: function () {
            console.log('wow, this was a 350px-scroll-match!');
          },
          /* Callback when scroll position does not match anymore */
          onUnmatch: function () {
            console.log('nope, this was not a 350px-scroll-match!');
          },
          /* Callback when scroll > value (fired only once per condition change) */
          onGreater: function () {
            console.log('aaaha... the scroll is greater than 350px');
          },
          /* Callback when scroll < value (fired only once condition change) */
          onLower: function () {
            console.log('huhuu... going low now? < 350px');
          }
        },
        /* min-max-range example */
        {
          /* css as an object */
          css: {
            /* class applied when scroll >= min && scroll <= max */
            /* lt / gt / eq do not work with a min and max range */
            bt: 'this-is-my-special-class-match-range'
          },
          /* min value */
          min: 15,
          /* max value */
          max: '60%'
        }
      ]
    }
  }
}
```

---

#### edge

> Tracks mousemove on a certain area of an elements edge.

![edge tracker demo](/docs/img/edge-tracking-demo.gif?raw=true "edge tracker in action")

---

![edge tracker demo console](/docs/img/edge-tracking-demo-console.gif?raw=true "edge tracker in action console")
_(Notice: console recording and demo above are not synced)_

**Default classNames**

If no custom css class-name is defined. Tracky creates a unique name by the given values by default. Note that the %-digit will be replaced by 'pc' (percent).

```javascript
// value: [value]
[options.classPrefix]['edge'][matchedPosition='top | right | bottom | left'][value][options.classSuffix]
```

```javascript
// in case of a corner the values will be combined
// value: [ y | x ]
[options.classPrefix]['edge'][matchedPosition='top-right | top-left | bottom-right | bottom-left'][value.y]['-'][value.x][options.classSuffix]
```

```javascript
// value: 50
tracky-edge-top-50 // when touches top
tracky-edge-right-50 // when touches right
tracky-edge-bottom-50 // when touches bottom
tracky-edge-left-50 // when touches left
tracky-edge-top-right-50-50 // when touches top-right
tracky-edge-top-left-50-50 // when touches top-left
tracky-edge-bottom-right-50-50 // when touches bottom right
tracky-edge-bottom-left-50-50 // when touches bottom left
```

```javascript
// value: [50,'25%',10,90]
tracky-edge-top-50 // when touches top
tracky-edge-right-25pc // when touches right
tracky-edge-bottom-10 // when touches bottom
tracky-edge-left-90 // when touches left
tracky-edge-top-right-50-25pc // when touches top-right
tracky-edge-top-left-50-90 // when touches top-left
tracky-edge-bottom-right-10-25pc // when touches bottom right
tracky-edge-bottom-left-10-90 // when touches bottom left
```

**Example configuration object**

```javascript
{
  events: {
    edge: {
      breakpoints: [
        /* defines an edge area of 50 pixel */
        50,
        /* defines an edge area of 20 percent */
        '20%',
        /* defines an edge area as array */
        /* of top: 18px right: 55px, bottom: 66%, left: 77px */
        [18, 55, '66%', 77],
        /* define an edge area with a more complex object */
        {
          css: {
            /* class applied when cursor hits the top edge area */
            top: 'edge-tracker-top',
            /* class applied when cursor hits the right edge area */
            right: 'edge-tracker-right',
            /* class applied when cursor hits the bottom edge area */
            bottom: 'edge-tracker-bottom',
            /* class applied when cursor hits the left edge area */
            left: 'edge-tracker-left',
            /* class applied when cursor hits the overlapping coner of top and right edge area */
            topRight: 'edge-tracker-top-right',
            /* class applied when cursor hits the overlapping coner of top and left edge area */
            topLeft: 'edge-tracker-top-left',
            /* class applied when cursor hits the overlapping coner of bottom and right edge area */
            bottomRight: 'edge-tracker-bottom-right',
            /* class applied when cursor hits the overlapping coner of bottom and left edge area */
            bottomLeft: 'edge-tracker-bottom-left',
          },
          /* value defines the edge area around the element */
          value: '15%',
          /* callback when cursor touches any edge area */
          onMatch: function () {
            console.log('cb: match');
          },
          /* callback when cursor has left any edge area */
          onUnmatch: function () {
            console.log('cb: mismatch');
          },
          /* callback when cursor touches top edge area */
          onMatchTop: function () {
            console.log('cb: match-top');
          },
          /* callback when cursor touches right edge area */
          onMatchRight: function () {
            console.log('cb: match-right');
          },
          /* callback when cursor touches bottom edge area */
          onMatchBottom: function () {
            console.log('cb: match-bottom');
          },
          /* callback when cursor touches left edge area */
          onMatchLeft: function () {
            console.log('cb: match-left');
          },
          /* callback when cursor touches top right corner */
          onMatchTopRight: function () {
            console.log('cb: match-top-right');
          },
          /* callback when cursor touches top left corner */
          onMatchTopLeft: function () {
            console.log('cb: match-top-left');
          },
          /* callback when cursor touches bottom right corner */
          onMatchBottomRight: function () {
            console.log('cb: match-bottom-right');
          },
          /* callback when cursor touches bottom left corner */
          onMatchBottomLeft: function () {
            console.log('cb: match-bottom-left');
          },
          /* callback when cursor left top edge */
          onUnmatchTop: function () {
            console.log('cb: un-match-top');
          },
          /* callback when cursor left right edge */
          onUnmatchRight: function () {
            console.log('cb: un-match-right');
          },
          /* callback when cursor left bottom edge */
          onUnmatchBottom: function () {
            console.log('cb: un-match-bottom');
          },
          /* callback when cursor left left edge */
          onUnmatchLeft: function () {
            console.log('cb: un-match-left');
          },
          /* callback when cursor left top right corner */
          onUnmatchTopRight: function () {
            console.log('cb: un-match-top-right');
          },
          /* callback when cursor left top left corner */
          onUnmatchTopLeft: function () {
            console.log('cb: un-match-top-left');
          },
          /* callback when cursor left bottom right corner */
          onUnmatchBottomRight: function () {
            console.log('cb: un-match-bottom-right');
          },
          /* callback when cursor left bottom left corner */
          onUnmatchBottomLeft: function () {
            console.log('cb: un-match-bottom-left');
          }
        },
        /* define a value as an array of (top/right/buttom/left) */
        {
          value: [
            '15%',
            '88%',
            45,
            66
          ]
        },
        /* define a value as an object with specific areas */
        {
          value: {
            top: 44,
            right: 88,
            bottom: '66%',
            left: 99,
          }
        },
        {
          /* define css class as string will apply this class whenever an area is touched */
          css: 'hit-any-edge',
          /* define a value with an array of 2 elements will follow the css rules for padding/margin */
          /* so this will autocomplete bottom and left like - top: 14px, right: 66px, bottom: 14px, left: 66px */
          value: [14, 66]
        }
      ]
    }
  }
}
```

---

#### orientation

> Tracks device orientation on x/y/z axis. Defined by the angle of alpha/beta/gamma. Values are in degree or percent. 

![orientation tracker demo](/docs/img/orientation-tracker-demo.gif?raw=true "orientation tracker in action")

---

![orientation tracker demo console](/docs/img/orientation-tracker-console.gif?raw=true "orientation tracker in action console")
_(Notice: console recording and demo above are not synced)_

**Default classNames**

If no custom css class-name is defined. Tracky creates a unique name by the given values by default. Note that the %-digit will be replaced by 'pc' (percent).

```javascript
// value: [value]
[options.classPrefix]['orientation'][axis='alpha | beta | gamma'][direction='(empty) | left | right | up | down'][value][options.classSuffix]
```

```javascript
// value: 50
tracky-orientation-alpha-50 // when alpha > value
tracky-orientation-alpha-left-50 // when alpha > value && direction === left
tracky-orientation-alpha-right-50 // when alpha > value && direction === right
tracky-orientation-beta-50 // when alpha > value
tracky-orientation-beta-up-50 // when beta > value && direction === upwards
tracky-orientation-beta-down-50 // when beta > value && direction === downwards
tracky-orientation-gamma-50 // when gamma > value
tracky-orientation-gamma-left-50 // when gamma > value && direction === left
tracky-orientation-gamma-right-50 // when gamma > value && direction === right
```

```javascript
// value: [50,'25%',10]
tracky-orientation-alpha-50 // when alpha > value
tracky-orientation-alpha-left-50 // when alpha > value && direction === left
tracky-orientation-alpha-right-50 // when alpha > value && direction === right
tracky-orientation-beta-25pc // when alpha > value
tracky-orientation-beta-up-25pc // when beta > value && direction === upwards
tracky-orientation-beta-down-25pc // when beta > value && direction === downwards
tracky-orientation-gamma-10 // when gamma > value
tracky-orientation-gamma-left-10 // when gamma > value && direction === left
tracky-orientation-gamma-right-10 // when gamma > value && direction === right
```

**Example configuration object**

```javascript
{
  events: {
    orientation: {
      /* Enable the orientation tracker */
      enable: true,
      breakpoints: [
        /* breakpoint as number will apply this value for alpha/beta/gamma */
        50,
        /* breakpoint as array with a length of 3 will deconstruct the values to alpha[0]/beta[1]/gamma[2] */
        [18, 55, 66],
        /* breakpoint as percent string will apply this value for alpha/beta/gamma - consider: */
        /* alpha 100% = 360deg  */
        /* beta 100% = 180deg  */
        /* gamma 100% = 90deg  */
        '30%',
        /* breakpoint values can be set as object with property alpha/beta/gamma  */
        {
          value: {
            alpha: 44,
            beta: 88,
            gamma: '66%',
          }
        },
        /* breakpoint as complex object */
        {
          css: {
            /* css class applied when alpha > value.alpha */
            alpha: 'edge-tracker-alpha',
            /* css class applied when beta > value.beta */
            beta: 'edge-tracker-beta',
            /* css class applied when gamma > value.gamma */
            gamma: 'edge-tracker-gamma',
            /* css class applied when alpha direction is heading left */
            alphaLeft: 'edge-tracker-alpha-left',
            /* css class applied when alpha direction is heading right */
            alphaRight: 'edge-tracker-alpha-right',
            /* css class applied when beta direction is heading downwards */
            betaDown: 'edge-tracker-beta-down',
            /* css class applied when beta direction is heading upwards */
            betaUp: 'edge-tracker-beta-up',
            /* css class applied when gamma direction is heading right */
            gammaRight: 'edge-tracker-gamma-right',
            /* css class applied when gamma direction is heading left */
            gammaLeft: 'edge-tracker-gamma-left',
          },
          /* values set as array (alpha/beta/gamma) */
          value: ['15%', 66, 99],
          /* callback when any value matches the condition */
          onMatch: function () {
            console.log('cb: match');
          },
          /* callback when any value left condition */
          onUnmatch: function () {
            console.log('cb: mismatch');
          },
          /* callback when alpha value match the condition */
          onMatchAlpha: function () {
            console.log('cb: match-alpha');
          },
          /* callback when beta value match the condition */
          onMatchBeta: function () {
            console.log('cb: match-beta');
          },
          /* callback when gamma value match the condition */
          onMatchGamma: function () {
            console.log('cb: match-gamma');
          },
          /* callback when alpha value left the condition */
          onUnmatchAlpha: function () {
            console.log('cb: unmatch-alpha');
          },
          /* callback when beta value left the condition */
          onUnmatchBeta: function () {
            console.log('cb: un-match-beta');
          },
          /* callback when gamma value left the condition */
          onUnmatchGamma: function () {
            console.log('cb: un-match-gamma');
          },
          /* callback when alpha value match the condition and is heading left */
          onMatchAlphaLeft: function () {
            console.log('cb: match-alpha-left');
          },
          /* callback when alpha value match the condition and is heading right */
          onMatchAlphaRight: function () {
            console.log('cb: match-alpha-right');
          },
          /* callback when beta value match the condition and is heading upwards */
          onMatchBetaUp: function () {
            console.log('cb: match-beta-up');
          },
          /* callback when beta value match the condition and is heading downwards */
          onMatchBetaDown: function () {
            console.log('cb: match-beta-down');
          },
          /* callback when gamma value match the condition and is heading left */
          onMatchGammaLeft: function () {
            console.log('cb: match-gamma-left');
          },
          /* callback when gamma value match the condition and is heading right */
          onMatchGammaRight: function () {
            console.log('cb: match-gamma-right');
          },
          /* callback when condition left -> alpha heading left  */
          onUnmatchAlphaLeft: function () {
            console.log('cb: un-match-alpha-left');
          },
          /* callback when condition left -> alpha heading right  */
          onUnmatchAlphaRight: function () {
            console.log('cb: un-match-alpha-right');
          },
          /* callback when condition left -> beta heading up  */
          onUnmatchBetaUp: function () {
            console.log('cb: un-match-beta-up');
          },
          /* callback when condition left -> beta heading down */
          onUnmatchBetaDown: function () {
            console.log('cb: un-match-beta-down');
          },
          /* callback when condition left -> gamma heading left */
          onUnmatchGammaLeft: function () {
            console.log('cb: un-match-gamma-left');
          },
          /* callback when condition left -> gamma heading right */
          onUnmatchGammaRight: function () {
            console.log('cb: un-match-gamma-right');
          }
        },
        /* small configuration with css as string applied for any match */
        {
          css: 'hit-any-orientation',
          value: 40,
        },
        /* value defined as object with only alpha and gamma defined */
        {
          value: {
            alpha: 13,
            gamma: 88,
          }
        }
      ]
    }
  }
}
```


## Features

**Scroll Tracker**

Tracking a scroll event on defined breakpoints or within a certain range. Including horizontal and vertical scroll.
  
**Cursor-Edge Tracker**

Tracks if a the cursor touches the edge of an element within a defined range. 

**Device orientation Tracker**

Detects device orientation tilting on x/y/z-axis.

**Live bindings**

DOM-changes are on track and will bind and unbind events on a selector when the elements appears or removes. This makes it easy to use in Angular, React or Ionic.

**Debounced events**

Tracker events are debounced by default to avoid unnecessary DOM-rendering.

**ES2015 (ES6)-Modules**

You can easily import the Tracky-Module with ES2015 module-loaders. It also have a backward compatible version for ES5-Support.

**Vanilla JS**

Written in plain Javascript without the need for jQuery or other libraries.
