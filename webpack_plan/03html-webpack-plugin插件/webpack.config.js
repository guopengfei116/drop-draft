var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口文件
    entry: {
      main: path.resolve(__dirname, 'src/js/main.js'),
      main2: path.resolve(__dirname, 'src/js/main.js')
    },

    // 输出路径
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name]_[chunkhash:8].js'
    },

    // 插件使用
    plugins: [
      new htmlWebpackPlugin({
        template: 'index.html',
        inject: 'body',
        minify:{ // 压缩优化HTML页面
          collapseWhitespace:true, // 合并空白字符
          removeComments:true, // 移除注释
          removeAttributeQuotes:true // 移除属性上的引号
        }
      })
    ],
};
