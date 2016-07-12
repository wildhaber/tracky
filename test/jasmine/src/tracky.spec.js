'use strict';

// Describe

require('../../../dist/tracky');
var _tracky = Tracky.default;

describe(
  'tracky.js general', function () {

    var _tracky = Tracky.default;

    it(
      'empty constructor constructs without exception', function () {
        expect(
          function () {
            return new _tracky();
          }
        ).not.toThrowError();
      }
    );

    it(
      'construct with malformed options', function () {
        expect(
          function () {
            return new _tracky('a', 'b', 'c');
          }
        ).not.toThrowError();
        expect(
          function () {
            return new _tracky(null, undefined, '');
          }
        ).not.toThrowError();
        expect(
          function () {
            return new _tracky(undefined);
          }
        ).not.toThrowError();
        expect(
          function () {
            return new _tracky(
              'selector', {
                bad: 'example',
                events: null
              }
            );
          }
        ).not.toThrowError();
      }
    );

    it(
      'empty constructor asserts body as selector', function () {
        var t = new _tracky();
        expect(t._selectors).toContain('body');
      }
    );

    it(
      'define custom selectors in constructor', function () {
        var customSelectors = ['custom1', 'custom2'];
        var t = new _tracky(customSelectors);
        expect(t._selectors).toContain(customSelectors[0]);
        expect(t._selectors).toContain(customSelectors[1]);
        expect(t._selectors).not.toContain('body');
      }
    );
  }
);

describe(
  'tracky.js - registerSelectors', function () {

    it(
      'should add selector without replace flag', function () {
        var customSelectors = ['custom1', 'custom2'];
        var addonSelectors = ['addon1', 'addon2'];
        var addonSelector = 'addon3';

        var t = new _tracky(customSelectors);
        t.registerSelectors(addonSelectors);
        t.registerSelectors(addonSelector);

        expect(t._selectors).toContain(customSelectors[0]);
        expect(t._selectors).toContain(customSelectors[1]);
        expect(t._selectors).toContain(addonSelectors[0]);
        expect(t._selectors).toContain(addonSelectors[1]);
        expect(t._selectors).toContain(addonSelector);
      }
    );

    it(
      'should return current bound selectors', function () {
        var customSelectors = ['custom1', 'custom2'];
        var addonSelectors = ['addon1', 'addon2'];
        var addonSelector = 'addon3';

        var t = new _tracky(customSelectors);
        t.registerSelectors(addonSelectors);
        t.registerSelectors(addonSelector);

        expect(t.registerSelectors().length).toBe(5);
      }
    );

    it(
      'should clear selectors with replace flag', function () {
        var customSelectors = ['custom1', 'custom2'];
        var addonSelectors = ['addon1', 'addon2'];
        var addonSelector = 'addon3';

        var t = new _tracky(customSelectors);
        t.registerSelectors(addonSelectors);
        t.registerSelectors(addonSelector);
        t.registerSelectors(addonSelector, true);

        expect(t._selectors).not.toContain(customSelectors[0]);
        expect(t._selectors).not.toContain(customSelectors[1]);
        expect(t._selectors).not.toContain(addonSelectors[0]);
        expect(t._selectors).not.toContain(addonSelectors[1]);
        expect(t._selectors).toContain(addonSelector);
        expect(t._selectors.length).toBe(1);
      }
    );

  }
);


describe(
  'tracky.js - addSelector', function () {

    it(
      'should add selector without replace flag', function () {
        var customSelectors = ['custom1', 'custom2'];
        var addonSelectors = ['addon1', 'addon2'];
        var addonSelector = 'addon3';

        var t = new _tracky(customSelectors);
        t.addSelector(addonSelectors)
          .addSelector(addonSelector);

        expect(t._selectors).toContain(customSelectors[0]);
        expect(t._selectors).toContain(customSelectors[1]);
        expect(t._selectors).toContain(addonSelectors[0]);
        expect(t._selectors).toContain(addonSelectors[1]);
        expect(t._selectors).toContain(addonSelector);
      }
    );

    it(
      'should return Tracky instance', function () {

        var addonSelector = 'addon3';

        var t = new _tracky();
        var _i = t.addSelector(addonSelector);
        var _emptyInstance = t.addSelector();

        expect(_i).toEqual(jasmine.any(_tracky));
        expect(_emptyInstance).toEqual(jasmine.any(_tracky));

      }
    );

    it(
      'should ignore anything but valid selector strings', function () {

        var invalidSelectors = [true, false, null, '', '-invalid'];

        var t = new _tracky();
        t.addSelector(invalidSelectors);

        expect(t._selectors).not.toContain(invalidSelectors[0]);
        expect(t._selectors).not.toContain(invalidSelectors[1]);
        expect(t._selectors).not.toContain(invalidSelectors[2]);
        expect(t._selectors).not.toContain(invalidSelectors[3]);
        expect(t._selectors).not.toContain(invalidSelectors[4]);
        expect(t._selectors).toContain('body');
        expect(t._selectors.length).toBe(1);
      }
    );

    it(
      'should cleanup malformed selectors', function () {

        var selectors = ['valid', '', null, false, NaN, true, '-invalid'];

        var t = new _tracky();
        var cleanupList = t._cleanupSelector(selectors);
        var emptyList = t._cleanupSelector();
        var onlyString = t._cleanupSelector('string');
        var onlyBadString = t._cleanupSelector(undefined);

        expect(cleanupList).not.toContain('');
        expect(cleanupList).not.toContain(null);
        expect(cleanupList).not.toContain(false);
        expect(cleanupList).not.toContain(NaN);
        expect(cleanupList).not.toContain(true);
        expect(cleanupList).not.toContain('-invalid');
        expect(cleanupList).toContain('valid');
        expect(cleanupList.length).toEqual(1);

        expect(!!(t._cleanupSelector() instanceof Array)).toEqual(true);

        expect(emptyList.length).toEqual(0);
        expect(onlyString.length).toEqual(1);
        expect(onlyBadString.length).toEqual(0);

      }
    );

    it(
      'should ignore double entries', function () {

        var doubleSelectors = ['double', 'double'];

        var t = new _tracky(doubleSelectors);
        t.addSelector(doubleSelectors)
          .addSelector('double');

        expect(t._selectors).toContain(doubleSelectors[0]);
        expect(t._selectors.length).toBe(1);
      }
    );

  }
);

describe(
  'tracky.js - removeSelector', function () {

    it(
      'should remove a selector', function () {
        var customSelectors = ['custom1', 'custom2'];

        var t = new _tracky(customSelectors);
        t.removeSelector(customSelectors[0]);

        var tArray = new _tracky(customSelectors);
        tArray.removeSelector(customSelectors);

        expect(t._selectors).not.toContain(customSelectors[0]);
        expect(t._selectors).toContain(customSelectors[1]);
        expect(t._selectors.length).toEqual(1);

        expect(tArray._selectors).not.toContain(customSelectors[0]);
        expect(tArray._selectors).not.toContain(customSelectors[1]);
        expect(tArray._selectors.length).toEqual(0);

      }
    );

    it(
      'should return Tracky instance', function () {

        var addonSelector = 'addon3';

        var t = new _tracky(addonSelector);

        expect(t.removeSelector(addonSelector)).toEqual(jasmine.any(_tracky));
        expect(t.removeSelector()).toEqual(jasmine.any(_tracky));

      }
    );

    it(
      'should ignore removing a not existing selector', function () {

        var t = new _tracky();
        t.removeSelector('this-selector-does-not-exist');

        expect(t._selectors.length).toEqual(1);
      }
    );


  }
);

describe(
  'tracky.js - getNodesCount', function () {

    it(
      'should return length of nodes', function () {
        var t = new _tracky();
        expect(t.getNodesCount()).toBeGreaterThan(-1);
      }
    );

    it(
      'should return 2 mocked nodes', function () {
        var t = new _tracky();
        t._nodes = [ ['mocked'] , ['nodes'] ];

        expect(t.getNodesCount()).toEqual(2);
      }
    );

  }
);

describe(
  'tracky.js - getEventsOptions', function () {

    it(
      'should return an object', function () {
        var t = new _tracky('selector', {});
        expect(t._getEventsOptions()).toEqual({});
      }
    );

    it(
      'should return an empty object when event is not defined', function () {
        var t = new _tracky('selector', {});
        expect(t._getEventsOptions(false)).toEqual({});
        expect(t._getEventsOptions(true)).toEqual({});
        expect(t._getEventsOptions({})).toEqual({});
        expect(t._getEventsOptions('i-dont-know-you')).toEqual({});
      }
    );

    it(
      'should return a given event option', function () {

        var eventName = 'someEvent';
        var someEventsOptions = {options: 'are', necess: 'ary'};

        var options = {
          events: {}
        };

        options.events[eventName] = someEventsOptions;

        var t = new _tracky('selector', options);

        expect(t._getEventsOptions(eventName)).toEqual(someEventsOptions);
      }
    );

  }
);

describe(
  'tracky.js - flattenNodes', function () {

    it(
      'should return an array', function () {
        var t = new _tracky('selector', {});
        expect(t._flattenNodes(null)).toEqual([]);
      }
    );

    it(
      'should flatten arrays with 2 levels into 1 hierarchy', function () {
        var t = new _tracky('selector', {});

        var nodesToFlatten = [
          [
            'node1',
            'node2',
            'node3'
          ],
          [
            'node4',
            'node5',
            'node6'
          ],
          [
            'node7',
            'node8',
            'node9'
          ]
        ];

        expect(t._flattenNodes(nodesToFlatten).length).toEqual(9);

      }
    );

    it(
      'should only have unique entries', function () {
        var t = new _tracky('selector', {});

        var nodesToFlattenWithDoubles = [
          [
            'node1',
            'node1', // ignore
            'node3'
          ],
          [
            'node4',
            'node1', // ignore
          ],
          [
            'node7',
            'node8',
            'node9',
          ]
        ];

        expect(t._flattenNodes(nodesToFlattenWithDoubles).length).toEqual(6);

      }
    );

    it(
      'should ignore malformed input', function () {
        var t = new _tracky('selector', {});

        var malformed = [
          [
            'node1',
            'node1',
            'node3'
          ],
          [
            // Empty
          ],
          {
            wrong: 'type'
          },
          null,
          undefined,
          123,
          'custom string',
          [
            'node4',
            'node1',
            {
              also: 'objects'
            }
          ],
          [
            'node7',
            'node8',
            'node9',
            {
              also: 'objects'
            }
          ]
        ];

        var malformed2 = {
          'i' : 'm-an-object'
        };

        var malformed3 = 'what about a string';

        var malformed4 = -1;

        expect(function() { return t._flattenNodes(malformed); }).not.toThrowError();
        expect(function() { return t._flattenNodes(malformed2); }).not.toThrowError();
        expect(function() { return t._flattenNodes(malformed3); }).not.toThrowError();
        expect(function() { return t._flattenNodes(malformed4); }).not.toThrowError();

        expect(t._flattenNodes(malformed).length).toEqual(8);
        expect(t._flattenNodes(malformed2).length).toEqual(0);
        expect(t._flattenNodes(malformed3).length).toEqual(0);
        expect(t._flattenNodes(malformed4).length).toEqual(0);

      }
    );


    it(
      'should return a given event option', function () {

        var eventName = 'someEvent';
        var someEventsOptions = {options: 'are', necess: 'ary'};

        var options = {
          events: {}
        };

        options.events[eventName] = someEventsOptions;

        var t = new _tracky('selector', options);

        expect(t._getEventsOptions(eventName)).toEqual(someEventsOptions);
      }
    );

  }
);

describe(
  'tracky.js - findNodeDiff', function () {

    var examplePrior = [
      [
        'node1',
        'node2',
        'node3'
      ],
      [
        'node4',
        'node5',
        'node6'
      ],
      [
        'node7',
        'node8',
        'node9'
      ]
    ];

    var exampleCurrent = [
      [
        'node1',
        'node3'
      ],
      [
        'node3',
        'node4',
        'node5',
        'node6',
        'node7',
        'node10'
      ]
    ];

    var exampleCurrent2 = [
      [
        'node5',
        'node6',
        'node7',
        'node10'
      ]
    ];

    it(
      'should return an object with property added, removed, changes', function () {
        var t = new _tracky('selector', {});
        var nodeDiff = t.findNodeDiff(examplePrior, exampleCurrent);

        expect(nodeDiff.added).toBeDefined();
        expect(nodeDiff.removed).toBeDefined();
        expect(nodeDiff.changes).toBeDefined();

      }
    );

    it(
      'should return properties added and removed must be arrays', function () {
        var t = new _tracky('selector', {});
        var nodeDiff = t.findNodeDiff(examplePrior, exampleCurrent);

        expect(nodeDiff.added instanceof Array).toBe(true);
        expect(nodeDiff.removed instanceof Array).toBe(true);

      }
    );

    it(
      'should always have a positive counter for property changes', function () {
        var t = new _tracky('selector', {});
        var nodeDiff = t.findNodeDiff(examplePrior, exampleCurrent);

        expect(nodeDiff.changes).not.toBeLessThan(0);

      }
    );

    it(
      'should detect the changes of two 2-levels deep arrays', function () {
        var t = new _tracky('selector', {});
        var nodeDiff = t.findNodeDiff(examplePrior, exampleCurrent);
        var nodeDiff2 = t.findNodeDiff(exampleCurrent, examplePrior);
        var nodeDiff3 = t.findNodeDiff(examplePrior, exampleCurrent2);

        // Example Set1:

        expect(nodeDiff.changes).toEqual(4);

        expect(nodeDiff.added).toContain('node10');
        expect(nodeDiff.added.length).toEqual(1);

        expect(nodeDiff.removed).toContain('node2');
        expect(nodeDiff.removed).toContain('node8');
        expect(nodeDiff.removed).toContain('node9');
        expect(nodeDiff.removed.length).toEqual(3);

        // Example Set2:

        expect(nodeDiff2.changes).toEqual(4);

        expect(nodeDiff2.removed).toContain('node10');
        expect(nodeDiff2.removed.length).toEqual(1);

        expect(nodeDiff2.added).toContain('node2');
        expect(nodeDiff2.added).toContain('node8');
        expect(nodeDiff2.added).toContain('node9');
        expect(nodeDiff2.added.length).toEqual(3);

        // Example Set3:

        expect(nodeDiff3.changes).toEqual(7);

        expect(nodeDiff3.removed).toContain('node1');
        expect(nodeDiff3.removed).toContain('node2');
        expect(nodeDiff3.removed).toContain('node3');
        expect(nodeDiff3.removed).toContain('node4');
        expect(nodeDiff3.removed).toContain('node8');
        expect(nodeDiff3.removed).toContain('node9');
        expect(nodeDiff3.removed.length).toEqual(6);

        expect(nodeDiff3.added).toContain('node10');
        expect(nodeDiff3.added.length).toEqual(1);

      }
    );


    it(
      'should work with malformed inputs', function () {
        var t = new _tracky('selector', {});
        var nodeDiff = t.findNodeDiff(null, exampleCurrent);
        var nodeDiff2 = t.findNodeDiff(null, false);
        var nodeDiff3 = t.findNodeDiff(undefined, 'xyz');
        var nodeDiff4 = t.findNodeDiff({ an: 'object'});
        var nodeDiff5 = t.findNodeDiff(1,2,undefined);
        var nodeDiff6 = t.findNodeDiff(examplePrior, null);

        expect(function() { return nodeDiff; }).not.toThrowError();
        expect(function() { return nodeDiff2; }).not.toThrowError();
        expect(function() { return nodeDiff3; }).not.toThrowError();
        expect(function() { return nodeDiff4; }).not.toThrowError();
        expect(function() { return nodeDiff5; }).not.toThrowError();
        expect(function() { return nodeDiff6; }).not.toThrowError();

        expect(nodeDiff.changes).toEqual(7);
        expect(nodeDiff2.changes).toEqual(0);
        expect(nodeDiff3.changes).toEqual(0);
        expect(nodeDiff4.changes).toEqual(0);
        expect(nodeDiff5.changes).toEqual(0);
        expect(nodeDiff6.changes).toEqual(9);

        expect(nodeDiff.added.length).toEqual(7);
        expect(nodeDiff6.removed.length).toEqual(9);

      }
    );

    describe(
      'tracky.js - disable', function () {

        var options = {
          events : {
            scroll : {
              enable: true
            },
            edge : {
              enable: true
            }
          }
        };

        it(
          'should disable scroll a listener by string', function () {
            var t = new _tracky('body', options);
            t.disable('scroll');

            var scrollInstance = t._listeners.filter(function(l) {
              return l.key === 'scroll';
            })[0].instance;

            expect(scrollInstance._enabled).toEqual(false);
          }
        );

        it(
          'should disable scroll a listener by array', function () {
            var t = new _tracky('body', options);
            t.disable(['scroll']);

            var scrollInstance = t._listeners.filter(function(l) {
              return l.key === 'scroll';
            })[0].instance;

            expect(scrollInstance._enabled).toEqual(false);
          }
        );

        it(
          'should disable edge a listener by string', function () {
            var t = new _tracky('body', options);
            t.disable('edge');

            var edgeInstance = t._listeners.filter(function(l) {
              return l.key === 'edge';
            })[0].instance;

            expect(edgeInstance._enabled).toEqual(false);
          }
        );

        it(
          'should disable edge a listener by array', function () {
            var t = new _tracky('body', options);
            t.disable(['edge']);

            var edgeInstance = t._listeners.filter(function(l) {
              return l.key === 'edge';
            })[0].instance;

            expect(edgeInstance._enabled).toEqual(false);
          }
        );

        it(
          'should ignore empty disable', function () {
            var t = new _tracky('body', options);
            t.disable();

            var edgeInstance = t._listeners.filter(function(l) {
              return l.key === 'edge';
            })[0].instance;

            var scrollInstance = t._listeners.filter(function(l) {
              return l.key === 'scroll';
            })[0].instance;

            expect(edgeInstance._enabled).toEqual(true);
            expect(scrollInstance._enabled).toEqual(true);

          }
        );

      }
    );


    describe(
      'tracky.js - enable', function () {

        var options = {
          events : {
            scroll : {
              enable: true
            },
            edge : {
              enable: true
            }
          }
        };

        it(
          'should enable scroll a listener by string', function () {
            var t = new _tracky('body', options);
            t.enable('scroll');

            var scrollInstance = t._listeners.filter(function(l) {
              return l.key === 'scroll';
            })[0].instance;

            expect(scrollInstance._enabled).toEqual(true);
          }
        );

        it(
          'should enable scroll a listener by array', function () {
            var t = new _tracky('body', options);
            t.enable(['scroll']);

            var scrollInstance = t._listeners.filter(function(l) {
              return l.key === 'scroll';
            })[0].instance;

            expect(scrollInstance._enabled).toEqual(true);
          }
        );

        it(
          'should enable edge a listener by string', function () {
            var t = new _tracky('body', options);
            t.enable('edge');

            var edgeInstance = t._listeners.filter(function(l) {
              return l.key === 'edge';
            })[0].instance;

            expect(edgeInstance._enabled).toEqual(true);
          }
        );

        it(
          'should enable edge a listener by array', function () {
            var t = new _tracky('body', options);
            t.enable(['edge']);

            var edgeInstance = t._listeners.filter(function(l) {
              return l.key === 'edge';
            })[0].instance;

            expect(edgeInstance._enabled).toEqual(true);
          }
        );

        it(
          'should ignore empty enable', function () {
            var t = new _tracky('body', options);
            t.disable(['edge','scroll']);
            t.enable();

            var edgeInstance = t._listeners.filter(function(l) {
              return l.key === 'edge';
            })[0].instance;

            var scrollInstance = t._listeners.filter(function(l) {
              return l.key === 'scroll';
            })[0].instance;

            expect(edgeInstance._enabled).toEqual(false);
            expect(scrollInstance._enabled).toEqual(false);

          }
        );

      }
    );


  }


);


