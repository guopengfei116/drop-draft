var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    // 入口文件
    entry: {
      a: path.resolve(__dirname, 'src/js/a.js'),
      b: path.resolve(__dirname, 'src/js/b.js')
    },

    // 输出路径
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name]_[chunkhash:8].js'
    },

    // 插件使用
    plugins: [
      new htmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body'
      }),
      new cleanWebpackPlugin(['dist']),
      new webpack.optimize.CommonsChunkPlugin({
          name:'common', // 注意不要.js后缀
          chunks:['a','b']
      }),
      new ExtractTextPlugin("css/index.css")
//    new webpack.optimize.UglifyJsPlugin()
    ],

    module: {
      rules: [


        // css文件
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
          })
        },

        // less文件
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: ['css-loader', 'less-loader']
           })
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
