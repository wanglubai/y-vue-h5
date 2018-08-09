const webpack = require('webpack');
const {
  resolve,
  join
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const moment = require('moment');
const shelljs = require('shelljs');
const fs = require('fs');
const _ = require('lodash');
const uglifyJS = require("uglify-js");
const chalk = require('chalk');

function build(cmpt, type = "module", clean = false, pixel = 640) {
  const config = require("webpack.config")();
  const hashname = require('createHashcode')(moment().format('YYYY-MM'));


  config.entry.app = [];
  config.entry.app.push(resolve(__dirname, `../src/${type}/${cmpt}/dev`));
  config.output.path = resolve(__dirname, `../assets/vue/${hashname}`);
  config.output.filename = `jsbin/${cmpt}/${cmpt}-[chunkhash:8].js`;
  config.output.publicPath = `//r.plures.net/vue/${hashname}/`;

  const vendorFiles = [`../src/commons/fontsize.js`, `../src/commons/flexfix.js`];
  const vendors = [];
  vendorFiles.forEach(function (filePath) {
    vendors.push(fs.readFileSync(resolve(__dirname, filePath)));
  });

  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, `../src/${type}/${cmpt}/dev.html`),
      filename: `../../${cmpt}.html`,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin(`cssbin/${cmpt}/${cmpt}-[contenthash:8].css`),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  )
  config.module.rules.push({
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
      loaders: {
        css: ExtractTextPlugin.extract({
          fallbackLoader: "vue-style-loader",
          loader: 'css-loader!postcss-loader'
        }),
        postcss: ExtractTextPlugin.extract({
          fallbackLoader: "vue-style-loader",
          loader: 'css-loader'
        }),
        styl: ExtractTextPlugin.extract({
          fallbackLoader: "vue-style-loader",
          loader: 'css-loader!postcss-loader!stylus-loader'
        }),
        stylus: ExtractTextPlugin.extract({
          fallbackLoader: "vue-style-loader",
          loader: 'css-loader!postcss-loader!stylus-loader'
        })
      }
    }
  }, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "vue-style-loader",
      loader: 'css-loader!postcss-loader'
    })
  }, {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "vue-style-loader",
      loader: 'css-loader!postcss-loader!stylus-loader'
    })
  }, {
    test: /\.stylus$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: "vue-style-loader",
      loader: 'css-loader!postcss-loader!stylus-loader'
    })
  }, {
    test: /\.(jpg|jpeg|png|gif|swf)$/,
    loader: "file-loader",
    options: {
      name: `imagesbin/${cmpt}/[name]-[hash:6].[ext]`,
      publicPath: `//r.plures.net/vue/${hashname}/`
    }
  })

  config.context = resolve(__dirname, "../")

  config.resolve.modules = [resolve(__dirname, '../node_modules')];
  var compiler = webpack(config);

  if (!clean) shelljs.rm('-rf', resolve(__dirname, '../assets/vue/*'));

  compiler.run((err, stats) => {
    if (err) throw err

    const statsJOSN = stats.toJson({
      chunks: true
    });

    shelljs.exec(`cat /dev/null > ./assets/${cmpt}.txt`);
    _.each(statsJOSN.chunks, chunk => {
      _.each(chunk.files, file => {
        shelljs.exec(`echo //r.plures.net/vue/${hashname}/${file} >> ./assets/${cmpt}.txt`);
      })
    })
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}
module.exports = build;