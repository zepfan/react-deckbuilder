const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname, "app"),
	devtool: debug ? "inline-sourcemap" : false,
	entry: "./client.js",
	module: {
		loaders: [
            {
                test: /\.jsx?$/,
    			exclude: /(node_modules|bower_components)/,
    			loader: 'babel-loader',
    			query: {
    				presets: ['react', 'es2016', 'stage-0'],
    				plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
    			}
            },
            {
				test: /\.less$/,
				loader:	'style-loader!css-loader!less-loader'
			},
            {
				test: /\.css$/,
				loader: 'style-loader!css-loader'
            },
            {
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader'
			},
			{
				test: /\.svg/,
				loader: 'svg-url-loader'
			},
			{ 
				test: /\.json$/, 
				loader: 'json-loader' 
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	output: {
		path: __dirname + "/app/",
		filename: "client.min.js"
	},
	plugins: debug ? [] : [
    	new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	]
};
