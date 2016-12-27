var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src');

var config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:9090',
        'webpack/hot/only-dev-server',
        APP_DIR + '/index'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: APP_DIR,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                include: APP_DIR,
                loaders: [
                    'style',
                    'css',
                    'postcss',
                    'sass?outputStyle=expanded'
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.js',
            '.jsx',
            '.scss'
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    devServer: {
        hot: true,
        contentBase: BUILD_DIR
    }
};

module.exports = config;
