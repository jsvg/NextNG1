/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';
import autoprefixer from 'autoprefixer';
import postcssFocus from 'postcss-focus';
import postcssReporter from 'postcss-reporter';

export default {
  debug: true,
  noInfo: false,
  progress: true,
  stats: true,
  target: 'web',
  devtool: 'source-map',
  eslint: { configFile: path.resolve(process.cwd(), '.eslintrc') },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url?name=[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=[name].[ext]' },
      { test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]' },
      { test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
    ],
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.resource && module.resource.indexOf(path.resolve(process.cwd(), 'client')) === -1;
      },
    }),
  ],
  postcss: () => [
    postcssFocus(),
    autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
    postcssReporter({ clearMessages: true }),
  ],
};
