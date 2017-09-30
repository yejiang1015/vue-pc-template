const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: ['vue', 'vuex', 'vue-router', 'axios', 'vuex-router-sync']
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].[chunkhash].dll.js',
    library: '[name]_[chunkhash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_[chunkhash]'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};