var path = require('path');
var htmlWP = require('html-webpack-plugin');

module.exports = {
	
	// 要打包的js文件
	entry: './src/main.js',
	
	// 打包后输出的地址与打包后的文件名
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'build.js'
	},
	
	// 自动把打包后的js注入到index.html中的body元素
	plugins: [
		new htmlWP({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],
	
	// 打包时对应不同文件类型的模块进行配置
	module: {
		rules: [
			
			// 打包css文件模块，
			// css-loader负责把css文件打包到js中，style-loader负责让样式生效
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			
			// 解析sass文件模块并打包
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			
			// 解析less文件模块并打包
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			
			// 打包页面模版文件模块
			{
				test: /\.(html|tempate|tpl)$/,
				use: [
					'html-loader'
				]
			},
			
			// 打包图片与字体图标文件模块
			{
				test: /\.(png|jpg|gif|svg|ttf)$/,
				use: [
					// 因为这里要配置多小的文件要打包到js中，所以写法变成了一个对象
					{
						loader: 'url-loader',
						options: {
							limit: 10240 // 小于10kb的文件打包到js中，否则还是url形式引入
						}
					},
					'image-webpack-loader'
				]
			},
			
			// 解析es6语法编写的js为es5语法，让浏览器可运行
			{
				test: /\.js$/,
				use: [
					// 因为这里要配置一些参数，所以写法变成了一个对象
					{
						loader: 'babel-loader',
						options: {
                			presets: ['es2015'],   // 配置要解析的语法规范
                			plugins: ['transform-runtime']  // babel-loader的依赖，不引入部分es6代码可能会解析错误
						}
					}
				],
				// 排除掉这里的js模块，不然webpack解析他们，提高打包速度
				exclude: /node_modules/
			},
			
			// 解析vue文件模块并打包
			{
				test: /\.vue$/,
				use: [
					'vue-loader'
				]
			}
		]
	}
};
