var webpack = require('webpack');
var { resolve } = require('path');

var BUILD_DIR = resolve(__dirname, 'dist');
var APP_DIR = resolve(__dirname, 'src');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    APP_DIR + '/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader/webpack!babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss']
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    contentBase: BUILD_DIR,
    proxy: {
      '/api': {
        target: 'http://localhost:8081'
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ],
};
