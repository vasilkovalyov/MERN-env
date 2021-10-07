const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const ProgressPlugin = require('progress-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BuildFolder = 'dist'

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./js/[name].[contenthash:8].js",
        path: path.resolve(__dirname, BuildFolder),
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, `../client/${BuildFolder}`),
        publicPath: '/',
        host: 'localhost',
        port: 9090,
        hot: true,
        open: true,
        watchContentBase: true,
        historyApiFallback: true,
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: "defaults"
                            }]
                        ]
                    }
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: `/${BuildFolder}/`,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    publicPath: `../images/`,
                    outputPath: './images/',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    publicPath: `../fonts/`,
                    outputPath: './fonts/'
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            // inject: false - to disable auto insert to html css js files
            
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
        new ErrorOverlayPlugin(),
        new ProgressPlugin(true),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        })
    ],
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            // minSize: 10000,
			// maxSize: 250000,
            cacheGroups: {
                common: {
                    name: "main",
                    test: /\.(js)$/,
                },
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: false
                },
            },
        },
    },
    devtool: 'eval-source-map',
}