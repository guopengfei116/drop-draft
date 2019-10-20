var path = require('path');  // 因为部分配置需要绝对路径，导入path计算

// 引入webpack插件
var webpack = require('webpack');  // 自身有一些优化插件，用到了公共模块抽取查插件，压缩混淆js插件
var htmlPlugin = require('html-webpack-plugin');  // html处理
var cleanPlugin = require('clean-webpack-plugin');  // 删除文件
var extractTextPlugin = require('extract-text-webpack-plugin'); // 抽取公共css
var optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css

// 抽取css的loader配置
var cssConfig = extractTextPlugin.extract( {fallback: "style-loader", use: ["css-loader"]} );
var lessConfig = extractTextPlugin.extract( {fallback: "style-loader", use: ["css-loader", "less-loader"]} );
var sassConfig = extractTextPlugin.extract( {fallback: "style-loader", use: ["css-loader", "sass-loader"]} );

// webpack主配置
var config = {

  // 入口模块
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    libs: ['react', 'react-router-dom']
  },

  // 输出路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },

  // 模块配置
  module: {
    rules: [
      // css模块
      { test: /\.css$/, use: cssConfig },

      // less模块
      { test: /\.less$/, use: lessConfig },

      // sass模块
      { test: /\.(sass|scss)$/, use: sassConfig },

      // html模块
      { test: /\.(html|tpl)$/, use: [ 'html-loader' ] },

      // url模块
      { test: /\.(jpg|jpeg|png|gif|svg)$/, use: ['url-loader' ] },

      // js模块
      { test: /\.js$/, use: [ 'babel-loader' ], exclude: /node_modules/ }
    ]
  },

  // 插件配置
  plugins: [

    // 清除dist目录
    new cleanPlugin(['dist']),

    // html处理
    new htmlPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace:true, // 合并空白字符
        removeComments:true, // 移除注释
        removeAttributeQuotes:true // 移除属性上的引号
      }
    }),

    // js处理 => 公共抽取，压缩混淆
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
      chunks: [ 'main', 'libs' ]
    }),
//  new webpack.optimize.UglifyJsPlugin(),

    // css处理 => 样式提取，压缩
    new extractTextPlugin('css/bundle.css'),
    new optimizeCssAssetsPlugin()
  ],

  // webpack-dev-server配置
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    open: true,
    // 代理配置，/v2的请求转发到'https://api.douban.com'
    proxy: {
      '/v2/*': {
        target: 'https://api.douban.com',
        secure: false,
        compress: true,
        changeOrigin: true
      }
    }
  }

};

module.exports = config;
