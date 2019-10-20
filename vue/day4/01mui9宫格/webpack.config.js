var path = require('path');

module.exports = {
	entry: './main.js',
	output: {
		path: path.resolve(__dirname, './'),
		filename: 'build.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|svg|ttf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240 // 小于10kb的文件打包到js中
						}
					},
					'image-webpack-loader'
				]
			}
		]
	}
};
