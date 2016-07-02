// Karma configuration
// Generated on Sat Jul 02 2016 16:52:10 GMT+0200 (Mitteleuropäische Sommerzeit)

const path = require('path');

module.exports = function (config) {
  config.set(
    {

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: path.join(__dirname, '../'),


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'source-map-support'],


      // list of files / patterns to load in the browser
      files: [
        {pattern: 'dist/tracky.js', included: true, served: true},
        {pattern: 'test/**/*.spec.js', included: false}
      ],


      // list of files to exclude
      exclude: [
        '**/*.conf.js'
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {},


      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['spec','progress'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_WARN,

      loggers: [{ type: 'console' }],

      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false,

      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity,

      captureTimeout: 10000
    }
  )
};
