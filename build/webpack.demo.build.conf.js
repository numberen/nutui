const webpack = require('webpack');
const baseConf = require('./webpack.demo.base.conf.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const rimraf = require('rimraf');

rimraf('./dist/sites/demo', function (err) {
    if(err) console.log(err);
});

rimraf('./dist/sites/demo.html', function (err) {
    if (err) console.log(err);
});

module.exports = merge(baseConf, {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: false,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
});