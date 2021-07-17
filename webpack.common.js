const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './static/js/[name].[chunkhash:8].js',
        chunkFilename: './static/js/[name].[chunkhash:8].chunk.js',
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
                oneOf: [
                    {
                        test: /\.(ts|tsx)$/,
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
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}