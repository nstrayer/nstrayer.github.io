module.exports = {
	entry: './js/main.js',
	output: {
		path: './',
		filename:'main.bundle.js'
	},
	module: {
		loaders: [{
			exclude: '/node_modules/',
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	}
}