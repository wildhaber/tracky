'use strict';

// Describe

require('../../../dist/tracky');
var _tracky = Tracky.default;

describe(
  'tracky.js general', function () {

    var _tracky = Tracky.default;

    it(
      'empty constructor constructs without exception', function () {
        expect(function() { return new _tracky(); }).not.toThrowError();
      }
    );

    it(
      'empty constructor asserts body as selector', function () {
        let t = new _tracky();
        expect(t._selectors).toContain('body');
      }
    );

    it(
      'define custom selectors in constructor', function () {
        let customSelectors = ['custom1', 'custom2'];
        let t = new _tracky(customSelectors);
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
        let customSelectors = ['custom1', 'custom2'];
        let addonSelectors = ['addon1', 'addon2'];
        let addonSelector = 'addon3';

        let t = new _tracky(customSelectors);
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
        let customSelectors = ['custom1', 'custom2'];
        let addonSelectors = ['addon1', 'addon2'];
        let addonSelector = 'addon3';

        let t = new _tracky(customSelectors);
        t.registerSelectors(addonSelectors);
        t.registerSelectors(addonSelector);

        expect(t.registerSelectors().length).toBe(5);
      }
    );

    it(
      'should clear selectors with replace flag', function () {
        let customSelectors = ['custom1', 'custom2'];
        let addonSelectors = ['addon1', 'addon2'];
        let addonSelector = 'addon3';

        let t = new _tracky(customSelectors);
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
                let customSelectors = ['custom1', 'custom2'];
                let addonSelectors = ['addon1', 'addon2'];
                let addonSelector = 'addon3';

                let t = new _tracky(customSelectors);
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

                let addonSelector = 'addon3';

                let t = new _tracky();
                let _i = t.addSelector(addonSelector);

                expect(_i).toEqual(jasmine.any(_tracky));
            }
        );

        it(
            'should ignore anything but valid selector strings', function () {

                let invalidSelectors = [true, false, null, '', '-invalid'];

                let t = new _tracky();
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
            'should ignore double entries', function () {

                let doubleSelectors = ['double', 'double'];

                let t = new _tracky(doubleSelectors);
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
                let customSelectors = ['custom1', 'custom2'];

                let t = new _tracky(customSelectors);
                t.removeSelector(customSelectors[0]);

                expect(t._selectors).not.toContain(customSelectors[0]);
                expect(t._selectors).toContain(customSelectors[1]);
                expect(t._selectors.length).toEqual(1);

            }
        );

        it(
            'should return Tracky instance', function () {

                let addonSelector = 'addon3';

                let t = new _tracky(addonSelector);

                //console.log(instanceof t);

                expect(t.removeSelector(addonSelector)).toEqual(jasmine.any(_tracky));

            }
        );

        it(
            'should ignore removing a not existing selector', function () {

                let t = new _tracky();
                t.removeSelector('this-selector-does-not-exist');

                expect(t._selectors.length).toEqual(1);
            }
        );

        it(
            'should ignore double entries', function () {

                let doubleSelectors = ['double', 'double'];

                let t = new _tracky(doubleSelectors);
                t.addSelector(doubleSelectors)
                    .addSelector('double');

                expect(t._selectors).toContain(doubleSelectors[0]);
                expect(t._selectors.length).toBe(1);
            }
        );

    }
);
