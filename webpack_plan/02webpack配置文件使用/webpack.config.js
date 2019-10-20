var path = require('path');

module.exports = {

    // 入口文件
    entry: {
      main: path.resolve(__dirname, 'src/js/main.js'),
      main2: path.resolve(__dirname, 'src/js/main.js')
    },

    // 输出路径
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name]_[chunkhash].js'
    }
};
