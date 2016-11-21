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

// best source map for production
config.devtool = 'source-map';

// only one entry point since no hot reloading required
config.entry = config.constants.entry;

// set output directory to dist folder
// add hashes to chunk and filenames to cache bust deployments
config.output = {
  path: path.resolve(process.cwd(), 'dist'),
  publicPath: '/',
  filename: '[name].[hash].js',
  chunkFilename: '[name].[hash].js',
};

// ExtractText bundles s/css assets into their own respective chunks (vendor/main)
config.module.loaders.push(
  { test: /\.css$/, loader: ExtractTextPlugin.extract('css?minimize&sourceMap!postcss') },
  { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?minimize&sourceMap!postcss!sass?sourceMap') },
);

config.plugins = config.plugins.concat([
  // remove old build
  new CleanWebpackPlugin(['dist']),
  // fail on build errors
  new webpack.NoErrorsPlugin(),
  // ensure optimal chunk order config
  new webpack.optimize.DedupePlugin(),
  // name the extracted css assets, using hash for cache busting
  new ExtractTextPlugin('[name].[hash].css'),
  // extra-css minification process because css-loader's is feature-light
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: {
      discardComments: { removeAll: true },
    },
  }),
  // configure webpack-generated index.html
  new HtmlWebpackPlugin({
    // based generated index.html based on this file
    template: 'client/index.html',
    // minification on html asset
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
    // write script tags for cache busted assets in body
    inject: 'body',
    // watch hashes on assets
    hash: true,
  }),
  // minify the js assets, but don't mangle
  // the globals that angular depends on
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular'],
    },
  }),
]);

// build wrapped in promise so server fires
// up only after build is completed
const build = new Promise((resolve, reject) => {
  // log build start
  console.log(chalk.green.bgBlack.bold.underline('Generating minified bundle...'));

  // begin webpack build
  webpack(config).run((error, stats) => {
    // bail on any errors
    if (error) {
      console.log(chalk.red(error));
      reject(1);
    }

    // map stats to json for convenience
    const jsonStats = stats.toJson();

    // log build errors
    if (jsonStats.hasErrors) {
      console.log(chalk.red.bgBlack.bold.underline('Build errors:'));
      jsonStats.errors.map(err => console.log(chalk.red(err)));
    }

    // log build warnings
    if (jsonStats.hasWarnings) {
      console.log(chalk.yellow.bgBlack.bold.underline('Build warnings:'));
      jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    // log build stats
    console.log(chalk.blue.bgBlack.bold.underline('Build stats:'));
    console.log(stats);

    // log build success
    console.log(chalk.green.bold('Build success!'));
    resolve(0);
  });
});
build.then(() => {
  // launch server on build success
  server({
    port: 4000,
    ui: { port: 4001 },
    server: { baseDir: 'dist' },
    middleware: [historyApiFallback()],
  });
});
