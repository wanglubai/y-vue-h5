const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env={dev: true}) => {
  return {
    entry: {
      app: []
    },
    output: {
      filename: "[name].bundle.js",
      path: resolve(__dirname, "../assets"),
      publicPath: "http://localhost:8080/"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules(?!\/(dom7|swiper))/
        },
        {
          test: /\.(ejs|html)$/,
          loader: "ejs-loader"
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.styl', '.css'],
      alias: {
        pixi: "pixi.js/dist/pixi.min.js",
      }
    },
    externals: {
      "PIXI": "PIXI",
      Swiper: "Swiper",
      wx: "wx",
      PhotoClip: "PhotoClip",
      hammer: "hammer",
      $: "window.$",
      jquery: "window.$",
      lrz: "lrz",
      iscroll: "iscroll",
      'iscroll-zoom': 'iscroll-zoom'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  }
}
