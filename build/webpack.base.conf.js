const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js'],
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      /**
       * build构建后一直提示开发模式，将vue$: 'vue/dist/vue'改为vue$: 'vue/dist/vue.common'，参考下面地址
       * https://github.com/vuejs/vue-cli/issues/290
       */
      vue$: 'vue/dist/vue.common',
      src: resolve('src'),
      assets: resolve('src/assets'),
      api: resolve('src/api'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      store: resolve('src/store'),
      config: resolve('src/config'),
      lib: resolve('src/lib'),
      util: resolve('src/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders:[
          // 'file-loader',
          {
            loader: 'url-loader',
            query: {
              limit: 100,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          // {
          //   loader: 'image-webpack-loader',
          //   query: {
          //     mozjpeg: {
          //       progressive: true,
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     optipng: {
          //       optimizationLevel: 7,
          //     },
          //     // progressive: true,
          //     // optimizationLevel: 7,
          //     // interlaced: false,
          //     pngquant: {
          //       quality: '65-90',
          //       speed: 4
          //     }
          //   }
          // }
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // plugins: [
  //   new webpack.DllReferencePlugin({
  //     context: path.resolve(__dirname, '..'),
  //     manifest: require('./vendor-manifest.json')
  //   })
  // ]
};
