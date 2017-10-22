var path = require('path');

module.exports = {
	resolve: {
		alias: {
			Src: path.resolve(__dirname, './src'),
			Components: path.resolve(__dirname, './src/components/components'),
			Routes: path.resolve(__dirname, './src/routes/routes.js'),
			Core: path.resolve(__dirname, './src/core'),
			Utils: path.resolve(__dirname, './src/core/utils'),
			Redux: path.resolve(__dirname, './src/redux'),
			Containers: path.resolve(__dirname, './src/redux/containers'),
			// SVG: path.resolve(__dirname, './src/svg'),
		},
		extensions: ['.js', '.jsx']
	},
};
