const path = require('path');
const htmlWebapckPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

// 配置文件要求我们必须导出一个配置对象
module.exports = {

    // 入口
    entry: path.resolve(__dirname, './src/js/main.js'),

    // 输出
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle_[chunkhash:8].js'
    },

    //  插件配置
    plugins: [

        // 压缩html, 自动注入打包好的js文件到body里
        new htmlWebapckPlugin({
            template: './src/index.html',        // 要处理的html
            filename: 'index.html',                 // 处理后的html名称
            inject: 'body',                               // 自动注入js到什么地方
            minify:{                                         // 压缩优化HTML页面
                collapseWhitespace:true,         // 合并空白字符
                removeComments:true,           // 移除注释
                removeAttributeQuotes:true   // 移除属性上的引号
            }
        }),

        // 每次打包前先清除dist目录
        new cleanWebpackPlugin(['./dist'])
    ],

    // loader的作用是为了让webpack可以打包其他类型的模块
    module: {

        // 配置loader, 该配置选项是必须的
        rules: [

         // 打包css
         {
             test: /\.css$/,
             use: [ 'style-loader', 'css-loader' ]
         },
//
//          // 打包less
//          {
//              test: /\.less$/,
//              use: [ 'style-loader', 'css-loader', 'less-loader' ]
//          },
//
//          // 打包html模版
//          {
//              test: /\.(html|tpl)$/,
//              use: [ 'html-loader' ]
//          },

            // 打包url文件
            {
                test: /\.(png|jpg|gif|jpeg|svg|ttf)$/,
                use: [
                    // 默认配置全部打包进来
                    // 'url-loader'

                    // 指定小于10kb的图片才转为base64编码打包
                    {loader: 'url-loader', options: {limit: 10240}}
                ]
            },

            // 转换特殊语法编写的js文件
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
                exclude: path.resolve(__dirname, './node_modules')  // 如果项目引入了node-modules的东西,不转换它们
            },

      // 解析vue文件
            {
        test: /\.vue$/,
        use: [ 'vue-loader' ]
      }
        ]
    },

    devServer: {
        contentBase: 'src',
        open: true,
        port: 7777
    }
};