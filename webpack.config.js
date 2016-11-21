/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import WebpackNotifierPlugin from 'webpack-notifier';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssFocus from 'postcss-focus';
import postcssReporter from 'postcss-reporter';

export default {
  constants: {
    entry: path.resolve(process.cwd(), 'client/app/root.js'),
  },
  debug: true,
  progress: true,
  stats: true,
  noInfo: false,
  resolve: {
    root: path.resolve(process.cwd(), 'client'),
    modulesDirectories: [path.resolve(process.cwd(), 'node_modules')],
  },
  module: {
    loaders: [
      // { test: /\.html$/, loader: `ngtemplate?relativeTo=${(path.resolve(process.cwd()))}/client/app/!html` },
      { test: /\.html$/, loader: 'html' },
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!happypack/loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader' },
      { test: /\.(jpg|png|gif)$/, loaders: ['file-loader'] }, // leave out image optimization for now 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'] },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new HappyPack({
      loaders: ['babel'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.resource && module.resource.indexOf(path.resolve(process.cwd(), 'client')) === -1;
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  postcss: () => [
    postcssFocus(),
    autoprefixer({ browsers: ['last 2 versions', 'IE > 10'] }),
    postcssReporter({ clearMessages: true }),
  ],
};
