'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var distDir = path.join(__dirname, '/dist');
var buildDir = path.join(__dirname, '/build');

var appDir = path.join(__dirname, '/app');
var typeBuild = process.env.NODE_ENV || "development";
var outputDir = (typeBuild === "development") ? buildDir : distDir;

var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});


var pluginsList = [
  new CopyWebpackPlugin([{
    from: appDir + "/manifest.json",
    to: outputDir + '/manifest.json'
  }, {
    from: appDir + "/*.html",
    to: outputDir + '/*.html'
  }, {
    from: appDir + "/*.png",
    to: outputDir + "/*.png"
  }]),
  new ExtractTextPlugin("style/main.css"),
];

if (typeBuild === "production") {
  pluginsList.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: false
  }));
}


module.exports = {
  entry: {
    'popup': [
      path.join(__dirname, 'app/js/popup.js')
    ],
    'background': path.join(__dirname, 'app/js/background.js')
  },
  output: {
    path: outputDir,
    filename: '[name].js'
  },
  context: appDir,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  },
  resolve: {alias: alias},
  plugins: pluginsList,
  devtool: (typeBuild == "development") ? "source-map" : null,
};
