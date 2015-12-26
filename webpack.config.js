var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: './src/wordypass.js',
   output: {
       path: './dist/',
       filename: 'bundle.js'
   },
   module: {
       loaders: [
           { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
       ]
   },
   plugins: [
       new webpack.optimize.UglifyJsPlugin({minimize: true})
   ]
};
