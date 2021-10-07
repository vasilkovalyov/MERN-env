const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.config.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const BuildFolder = 'dist';
const pathToUploads = path.resolve(__dirname, `${BuildFolder}/images`);

module.exports = merge(common, {
	mode: "production",
	stats: {
		children: true,
	}, 
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin({
				test: /\.css$/i,
			}),
			new TerserPlugin({
				parallel: true,
				test: /\.js(\?.*)?$/i,
			}),
			new UglifyJsPlugin()
		],
	},
	plugins: [
		new CopyPlugin({
            patterns: [
                { 
					from: path.resolve(__dirname, 'src/assets/images'), 
					to: pathToUploads
				},
            ],
        }),
	]
})
