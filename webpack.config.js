
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = options;
var options =  {
	debug: true,
	entry: "./app/main.js",

	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].[hash].js',
	},

	module: {
		loaders: [{
				test: /\.html$/,
				loader: 'html'
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader")
			}, {
				test: /\.png$/,
				loader: 'url-loader?limit=100000&mimetype=image/png'
			}, {
				test: /\.jpg$/,
				loader: 'file-loader'
			}, {
                test: /\.js$/,
                loaders: ['ng-annotate', 'babel'],
                exclude: /node_modules/
            }
		]
	},

    plugins: [
        new ExtractTextPlugin("styles.[hash].css"),
		new HtmlWebpackPlugin({
	    	title: 'Application Demo',
	    	filename: 'index.html',
			template: 'app/index.ejs',
			hash: true,
			inject: 'body',
	    })
    ],

	resolve: {
		modulesDirectories: [
			'node_modules',
		]
	}
};

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod") {

	options.debug = false;

	options.plugins.push(new webpack.optimize.UglifyJsPlugin({
	    compress: {
	        warnings: false
	    },
		sourceMap: true,
		mangle: {
			except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad']
		}
	}));
} else {

}

module.exports = options;
