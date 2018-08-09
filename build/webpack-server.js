const webpack = require('webpack');
const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const fs = require("fs");
const uglifyJS = require("uglify-js");

module.exports = function devFn(cmpt, port = 80, type = "page", pixel = 640) {
  const config = require("webpack.config")();
  config.entry.app = [];
  config.entry.app.push(`webpack-dev-server/client?http://localhost:${port}/`, "webpack/hot/dev-server");
  config.entry.app.push(resolve(__dirname, `../src/${type}s/${cmpt}/dev`));
  config.entry.vendor = [resolve(__dirname, `../src/commons/fontsize.js`)];
  config.output.path = resolve(__dirname, '../assets');
  config.output.publicPath = "/";
  const vendorFiles = [`../src/commons/fontsize.js`, `../src/commons/flexfix.js`];
  const vendors = [];
  vendorFiles.forEach(function (filePath) {
    vendors.push(fs.readFileSync(resolve(__dirname, filePath)));
  });

  config.plugins.push(
    new HtmlWebpackPlugin({
      template: resolve(__dirname, `../src/${type}s/${cmpt}/dev.html`),
      filename: 'index.html',
      inject: false,
      vendor: uglifyJS.minify(
        require("babel-core").transform(vendors.join(''), {
          presets: ['es2015']
        }).code, {
          compress: {
            dead_code: true,
            drop_console: true,
            global_defs: {
              DEBUG: false,
              PIXEL: pixel
            }
          },
          fromString: true
        }
      ).code
    }),
    new webpack.ProvidePlugin({
      PIXI: "pixi.js/dist/pixi.min.js"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.PIXEL': pixel
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin()
  )

  config.resolve.modules = [resolve(__dirname, '../node_modules')];
  config.module.rules.push({
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
      loaders: {
        css: "vue-style-loader!css-loader!postcss-loader",
        stylus: "vue-style-loader!css-loader!postcss-loader!stylus-loader",
        styl: "vue-style-loader!css-loader!postcss-loader!stylus-loader"
      }
    }
  }, {
    test: /\.css$/,
    loader: "vue-style-loader!css-loader!postcss-loader",
  }, {
    test: /\.styl$/,
    loader: "vue-style-loader!css-loader!postcss-loader!stylus-loader",
  }, {
    test: /\.stylus$/,
    loader: "vue-style-loader!css-loader!postcss-loader!stylus-loader",
  }, {
    test: /\.(jpg|jpeg|png|gif|swf)$/,
    loader: "file-loader"
  })
  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
    hot: true,
    publicPath: "/",
    historyApiFallback: true,
    //https: true,
    stats: {
      colors: true
    }
  });

  server.listen(port, function (err) {
    console.log(port)
    if (err) {
      console.log(err);
      return;
    }
    opn(`http://localhost:${port}`)
  });
};