var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/index')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
