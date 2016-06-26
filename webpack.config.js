const webpack = require('webpack');

module.exports = {
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
        )
    ]
};