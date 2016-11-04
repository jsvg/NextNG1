/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import server from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';

config.entry = [
  'webpack-hot-middleware/client?reload=true',
  path.resolve(process.cwd(), 'client/app/app.js'),
];

config.output = {
  path: path.resolve(process.cwd(), 'client'),
  publicPath: '/',
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
};

config.module.loaders.push(
  { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'] },
  { test: /\.css$/, loaders: ['style', 'css?sourceMap', 'postcss'] },
);

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: 'client/index.html',
    inject: 'body',
    hash: true, // cache busting
  }),
]);

const bundler = webpack(config);

server({
  port: 3000,
  ui: { port: 3001 },
  open: false,
  server: { baseDir: 'client' },
  middleware: [
    historyApiFallback(),
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
        modules: false,
        chunkModules: false,
      },
    }),
    webpackHotMiddleware(bundler),
  ],
});
