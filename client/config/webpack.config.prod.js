var constants = require('./constants')
var webpack = require('webpack')
var autoPrefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        main: constants.SRC_DIRECTORY,
        vendors: ['react']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader")
            },
            /*{
                test: /\.png$/,
                loader: 'url-loader?limit=10000&mimetype=image/png'
            },*/
            {
                test: /\.png$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', 'styl']
    },
    output: {
        path: constants.PROD_DIRECTORY,
        publicPath: '/',
        filename: 'bundle.js'
    },
    postcss: [autoPrefixer()],
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production')}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("bundle.css", {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.bundle.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                dead_code: true,
                drop_console: true,
                warnings: true
            }
        })
    ]
};