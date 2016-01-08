var webpack = require('webpack');
var autoPrefixer = require('autoprefixer')

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders: [
            {
                loader: "babel-loader",
                exclude: /node_modules/,
                test: /\.jsx?$/,
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime'],
                    cacheDirectory: true
                }
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
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    postcss: [autoPrefixer()],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};