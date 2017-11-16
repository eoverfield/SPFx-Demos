var webpack = require('webpack');

module.exports = {
	entry: './lib/siteData.js',

	output: {
		filename: "bundle.js",
		libraryTarget: "var",
		library: "PnPDemo"
	},
	devtool: 'source-map',
	resolve: {
		enforceExtension: false,
		extensions: ['.js', '.ts'],
	
	},
	module: {
		rules: [{
		   	test: /\.ts$/, 
		   	use: 'ts-loader',
		   	exclude: '/node_modules/'
		   }
		]
	}
}