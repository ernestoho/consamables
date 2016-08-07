var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	proxy: {
		'*/api': 'http://localhost:8081/api'
	}
}).listen(9090, 'localhost', function(err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:9090/');
});