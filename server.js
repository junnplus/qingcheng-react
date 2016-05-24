var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

config.entry.app.unshift("webpack-dev-server/client?http://localhost:9090", "webpack/hot/dev-server");

config.devtool = 'eval';

var proxy = {
  "/api/*": {target: "http://python-china.org", host: "python-china.org"},
  "/session*": {target: "http://python-china.org", host: "python-china.org"},
};

var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  proxy: proxy,
  hot: true,
});

app.listen(9090, 'localhost', function (err, result) {
  console.log('Listening http://localhost:9090');
  if (err) {
    console.log(err);
  }
});
