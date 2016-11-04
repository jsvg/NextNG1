/* eslint-disable import/no-extraneous-dependencies, no-console */
import webpack from 'webpack';
import path from 'path';
import chalk from 'chalk';
import server from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import config from './webpack.config';

// config webpack
config.entry = path.resolve(process.cwd(), 'client/app/app.js');

config.output = {
  path: path.resolve(process.cwd(), 'dist'),
  publicPath: '/',
  filename: '[name].[hash].js',
  chunkFilename: '[name].[hash].js',
};

config.module.loaders.push(
  { test: /\.css$/, loader: ExtractTextPlugin.extract('css?minimize&sourceMap!postcss') },
  { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?minimize&sourceMap!postcss!sass?sourceMap') },
);

config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['dist']),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new ExtractTextPlugin('[name].[hash].css'),
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      discardComments: { removeAll: true },
    },
  }),
  new HtmlWebpackPlugin({
    template: 'client/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: 'body',
    hash: true,
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular'],
    },
  }),
]);

// build
const chalkError = chalk.red;
const chalkSuccess = chalk.green;
const chalkWarning = chalk.yellow;
const chalkProcessing = chalk.blue;
console.log(chalkProcessing('Generating minified bundle...'));
webpack(config).run((error, stats) => {
  if (error) {
    console.log(chalkError(error));
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(err => console.log(chalkError(err)));
  }
  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Build warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }
  console.log(chalkProcessing(`Build stats: ${stats}`));
  console.log(chalkSuccess('Build success!'));
  return 0;
});

// serve
server({
  port: 4000,
  ui: { port: 4001 },
  server: { baseDir: 'dist' },
  middleware: [historyApiFallback()],
});
