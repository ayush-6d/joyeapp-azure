const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./config/paths');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
process.env.NODE_ENV = 'production';
process.env.SERVER_BASE_URL = `https://us-central1-joye-768f7.cloudfunctions.net`;
function srcPath(subdir) {
    return path.join(__dirname, "src", subdir);
}

module.exports = {
    entry: ['node_modules/regenerator-runtime/runtime.js',
    './src/index.tsx'
],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './static/js/[name].[chunkhash:8].js',
        chunkFilename: './static/js/[name].[chunkhash:8].chunk.js',
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
    },
    mode: 'production',
    optimization: {
        minimize: true,
    },
    stats: 'none',
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['react', 'stage-0']
                },
                enforce: 'pre',
                include: paths.appSrc,
            },
            {
                oneOf: [
                    {
                        test: /\.(ts|tsx)$/,
                        include: paths.appSrc,

                        use: [
                            {
                                loader: require.resolve('ts-loader'),
                                options: {
                                    transpileOnly: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /.(woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                        use: 'url-loader?limit=1024&name=fonts/[name].[ext]'
                    },
                    {
                        test: /\.(jpg|jpeg|gif|png)$/,
                        use: 'url-loader?limit=10&mimetype=image/(jpg|jpeg|gif|png)&name=images/[name].[ext]'
                    },
                    {
                        test: /\.(scss|css)$/,
                        include: paths.appSrc,
                        use: [{
                            loader: "style-loader" // creates style nodes from JS strings
                        }, {
                            loader: "css-loader" // translates CSS into CommonJS
                        }, {
                            loader: "sass-loader" // compiles Sass to CSS
                        }]
                    },
                    {
                        loader: require.resolve('file-loader'),
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            src: srcPath('src'),
            components: path.resolve(__dirname, 'src/components/'),
            icons: path.resolve(__dirname, 'src/components/icons'),
        },
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'SERVER_BASE_URL': JSON.stringify(process.env.SERVER_BASE_URL)
            }
        })]
}