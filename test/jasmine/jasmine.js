var path = require('path');
var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var JasmineConfig = require('./../jasmine.json');
var noop = function () {};

var jrunner = new Jasmine(JasmineConfig);
jrunner.configureDefaultReporter({print: noop});
jasmine.getEnv().addReporter(new SpecReporter());
jrunner.loadConfigFile('./test/jasmine.json');
jrunner.execute();
