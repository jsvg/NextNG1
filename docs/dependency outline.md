# Dependency Outline
## App Dependencies
angular
angular-ui-router
normalize.css

## Testing, Linting
__Testing__
angular-mocks: stubbing
chai: tdd/bdd
karma-*, mocha: runners

__Linting__
eslint: js linter
eslint-config-airbnb-base: opinionated lint config
eslint-plugin-import: linter plugin
stylelint: css linter
stylelint-config-sass-guidelines: opinionated css lint config

## Compile Tools
babel-core: ES6 transpiler
babel-preset-latest: babel-core configation
babel-runtime: non-global polyfiller
babel-plugin-transform-runtime: polyfill execution package

## Webpack tools
__Loaders__
babel-loader: js loader
css-loader: css loading and sourcemapping
file-loader: static asset loading
html-loader: html loading
image-webpack-loader: image optimization
json-loader: json loader
ng-annotate-loader: ngInject annotator
sass-loader: scss loader and sourcemapping
postcss-loader: autoprefixer and other customization (see below @ postcss-*)
style-loader: generic fallback
url-loader: may be removed, but fallback for now

__Plugins__
clean-webpack-plugin: remove previous builds in dist folder
extract-text-webpack-plugin: create separate css files and sourcemaps on build
happypack: parallel bundling processor
html-webpack-plugin: inject script tags into html at bundle-time
optimize-css-assets-webpack-plugin: smart css minifier
progress-bar-webpack-plugin: progress bar for bundle process

__Other__
autoprefiex: apprend vendor prefixes to css based on config of last 2 browser versions
connect-history-api-fallback: single-page-app proxy request handler
node-libs-browser: explicit dep for many packages
node-sass: explicit dep for scss transpilation
postcss-focus: add :focus tags where necessary
postcss-reporter: notify on potential errors
webpack: bundler
webpack-dev-middleware: load bundles in memory
webpack-hot-middleware: hot reload in-member hundles
webpack-notifier: notify when bundle process is done

## Misc
plop: generate ng components based on input and blueprints
browser-sync: tunneling and browser synchronization
chalk: colorful command prompt
