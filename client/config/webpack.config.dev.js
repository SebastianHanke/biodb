var constants = require('./constants')
var webpack = require('webpack')
var autoPrefixer = require('autoprefixer')

module.exports = {
    devServer: {
        contentBase: constants.DIST_DIRECTORY
    },
    entry: {
        main: constants.SRC_DIRECTORY
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { cacheDirectory: true }
            },
            {
                test: /\.styl$/,
                loader: 'style!css!postcss!stylus?resolve url'
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
        path: constants.DIST_DIRECTORY,
        publicPath: '/',
        filename: 'bundle.js'
    },
    postcss: [autoPrefixer()],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};