'use strict';
process.env.BABEL_ENV = 'development';
// process.env.NODE_ENV = 'development';
// process.env.SERVER_BASE_URL = `https://us-central1-joye-768f7.cloudfunctions.net`;

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const publicPath = '/';
const publicUrl = '';
const env = 'development';
// const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'node_modules/regenerator-runtime/runtime.js',
    require.resolve('./polyfills'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ],
  devServer: {
    historyApiFallback: true,
    // https: true,
  },
  output: {
    pathinfo: false,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  mode: 'development',
  resolve: {
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
    ],
    alias: {

      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      new TsconfigPathsPlugin({ configFile: paths.appTsConfig })
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // { parser: { requireEnsure: false } },

      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(ts|tsx)$/,
            include: paths.appSrc,
            use: [
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
                },
              },
            ],
          },
          { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // new InterpolateHtmlPlugin(env.raw),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    // new WatchMissingNodeModulesPlugin(paths.appNodeModuWatchMissingNodeModulesPluginles),
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV':JSON.stringify( 'development'),
        'REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID':JSON.stringify(`b172c03f-be43-42e9-b17a-34fe50574266`),
        'SERVER_BASE_URL':JSON.stringify(`https://us-central1-joye-768f7.cloudfunctions.net`),
        'apiKey':JSON.stringify(`AIzaSyDgBMwAlFM7VnTNELf-ZJnWOkCETCTr9Kk`),
        'authDomain':JSON.stringify(`joye-768f7.firebaseapp.com`),
        'projectId':JSON.stringify(`joye-768f7`),
        'type':JSON.stringify(`service_account`),
        'project_id':JSON.stringify(`joye-768f7`),
        'REACT_APP_APP_ID':JSON.stringify(`b083d035-a374-45ea-911c-5ddf8569b0f5`),
        'databaseURL':JSON.stringify(`https://teams-768f7-e6e45.firebaseio.com`),
        'HTTPS':JSON.stringify(`true`),
        'client_secret':JSON.stringify(`Fex7Q~GUw2G3M2ofS8FgOQ-WudFV5wQHH.tUt`),
        'SSO_BACKEND_URL':JSON.stringify(`http://1bb8c079264f.ngrok.io`),
      }
    })],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
};
