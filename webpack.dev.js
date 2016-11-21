/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import server from 'browser-sync';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import config from './webpack.config';

// for build performance, choose efficient source map
// for pre-compiled code, but slower compile: eval-source-map
config.devtool = 'inline-eval-cheap-source-map';

// first entry helps with error regarding static asset loading
// with css-loader?sourceMaps - see issue #232
// second entry enables hot reload
// third is the client
config.entry = [
  path.resolve(process.cwd(), 'client/webpack-public-path'),
  'webpack-hot-middleware/client?reload=true',
  config.constants.entry,
];

// path set to client since hot reload stores assets in memory
// no hashing on naming to allow for file caching on rebuild
config.output = {
  path: path.resolve(process.cwd(), 'client'),
  publicPath: '/',
  filename: '[name].js',
  chunkFilename: '[name].bundle.js',
};

// css assets loaded from node_modules, (e.g. normalize.css)
// and scss assets loaded and transformed from client folder
config.module.loaders.push(
  { test: /\.css$/, include: /node_modules/, loaders: ['style-loader', 'css-loader?sourceMap'] },
  { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'] },
);

config.plugins = config.plugins.concat([
  // enable hot module replacement
  new webpack.HotModuleReplacementPlugin(),
  // dynamically build index.html
  new HtmlWebpackPlugin({
    // based on client/index.html
    template: 'client/index.html',
    // but write script tags to assets in body of index.html
    inject: 'body',
    // no worry about hash names
    hash: false,
  }),
]);

// generate the bundler for browser-sync
const bundler = webpack(config);

// run browser sync
server({
  port: 3000,
  ui: { port: 3001 },
  // don't open the browser when done
  open: false,
  // since assets are loaded in memory by bundler, point to client dir
  server: { baseDir: 'client' },
  // use middleware to manage assets and routing
  middleware: [
    // proxy for single-page-web app navigation
    historyApiFallback(),
    // rely on files to in memory from bundler
    webpackDevMiddleware(bundler, {
      noInfo: false,
      quiet: false,
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
        assets: true,
        version: false,
        hash: false,
        timings: true,
        chunks: true,
        modules: true,
        chunkModules: false,
      },
    }),
    // hot reload assets
    webpackHotMiddleware(bundler),
  ],
});
