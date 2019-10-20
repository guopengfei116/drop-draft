var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口文件
    entry: {
      main: path.resolve(__dirname, 'src/js/main.js'),
      main2: path.resolve(__dirname, 'src/js/main2.js')
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
        inject: 'body'
      })
    ],

    module: {
      rules: [
        // css文件
        {
          test: /\.css$/,
          use: [  'style-loader', 'css-loader' ]
        },

        // less文件
        {
          test: /\.less$/,
          use: [ 'style-loader', 'css-loader', 'less-loader' ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|bmp|svg)$/,
          use: [
            { loader: 'url-loader', options: {limit: 1000} },
            'image-webpack-loader'
          ]
        },

        {
          test: /\.html$/,
          use: 'html-loader'
        }

      ]
    }
};
