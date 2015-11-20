var webpack = require("webpack");
var path = require('path');

var publicPath = "/build/";

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, 'app/index')
        ]
    },
    output: {
        path: path.resolve(__dirname, publicPath),
        filename: "bundle.js",
        publicPath: publicPath
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'react-hot!jsx-loader?harmony'},
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
