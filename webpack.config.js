/*eslint-env node */

const webpack = require('webpack');
const pkg = require('./package.json');

/**
 * Create Preamble
 */

const preamble = '/**\n' +
  ' * tracky.js - ' + pkg.description + '\n' +
  ' * @version ' + pkg.version + '\n' +
  ' * @author Copyright (c) ' + pkg.author.name + ' < ' + pkg.author.url + ' >\n' +
  ' * @url ' + pkg.homepage + '\n' +
  ' * @license ' + pkg.license + '\n' +
  ' */';

/* CONFIG */

var wpConfig = {
  entry: "./src/tracky.es5.js",
  output: {
    path: __dirname + '/dist',
    filename: "tracky.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin(
      {
        'window.Tracky': './tracky'
      }
    ),
    new webpack.BannerPlugin(
      preamble, {
        raw: true
      }
    )
  ]
};


/***
 * Production environment
 */

const production = (process.argv.indexOf('--prod') > -1);

if (production) {

  // Add .min.js to current filename
  var fnArr = wpConfig.output.filename.split('.js');
  fnArr.push('.min.js');

  wpConfig.output.filename = fnArr.join('');

  wpConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin(
      {
        screwIe8: true,
        mangle: true,
        comments: /@(license|preserve|cc_on)/g,
      }
    )
  );

}

module.exports = wpConfig;
