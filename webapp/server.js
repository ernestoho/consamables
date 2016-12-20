var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/api/*': 'http://localhost:8081'
    }
}).listen(9090, '0.0.0.0', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:9090/');
});
