const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  assets: path.join(__dirname, 'assets'),
  build: path.join(__dirname, 'build'),
};
const ENV = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      },
      {
        test: /\.woff?$/,
        loader: 'file',
        include: PATHS.assets
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'Personal site',
      appMountId: 'app',
      inject: false,
      mobile: true
    })
  ]
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: ENV.host,
      port: ENV.port
    },
    module: {
      loaders: [
        // Define development specific CSS setup
        {
          test: /\.css$/,
          loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}