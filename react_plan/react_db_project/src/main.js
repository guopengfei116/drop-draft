// 项目的入口文件
import  React from 'react'
import ReactDOM from 'react-dom'

// 导入Ant组件
//配置完毕按需加载之后，只需从 antd 引入模块即可，无需单独引入样式。等同于下面手动引入的方式。

import App from './App.js'

// 将组件渲染到页面上
ReactDOM.render(<App />, document.getElementById('app'));