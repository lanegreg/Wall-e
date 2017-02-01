
const webpack = require('webpack')
    , path = require('path')
    , strip = require('strip-loader')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , config = {
      isProductionBuild: process.env.NODE_ENV === 'production',
      entry_path: path.join(__dirname, '_src/_client'),
      output_path: path.join(__dirname, 'dist/js'),

    }

console.log(' Webpack build for =>', process.env.NODE_ENV || 'development')


var devtool = '#source-map'
  , plugins = [
    new ExtractTextPlugin('../css/styles.css')
  ]

if(config.isProductionBuild) {
  plugins.push.apply(plugins, [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ])
  devtool = '#cheap-source-map'

  // webpack.module.loaders.push({
  //     test: /\.jsx?$/,
  //     exclude: /node_modules/,
  //     loader: strip.loader('console.log', 'debug')
  //   })
}

module.exports = {
  context: config.entry_path,
  entry: ['babel-polyfill', './client'],
  output: {
    path: config.output_path,
    filename: 'bundle.js'
  },

  devtool: devtool,

  plugins: plugins,

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', '!css')
      }
    ]
  },

  eslint: {
    configFile: './.eslintrc'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
