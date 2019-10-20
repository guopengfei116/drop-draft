import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import AppIndex from './src/component/index';   // 导入首屏页组件
import AppHome from './src/component/home';     // 导入首页组件
import AppMovie from './src/component/movie';   // 导入电影页组件
import AppMovieDetail from './src/component/movie/movie_detail';   // 导入电影详情页组件
import AppAbout from './src/component/about';   // 导入关于页组件

// 我们的根组件, 只放置路由配置组件, 用来控制页面的切换
export default class App extends Component {
  render() {
    return (
      // 要用路由插件, 必须要用该组件包裹
      <Router>
        {/* 分组 */}
        <Stack key={"root"}>
          {/* 相当于咱们之前的Route组件, 用来配置显示规则, 不过我们这里不是用url控制页面的 */}
          {/* 每个Scene组件需要配置一个key, 将来通过这个key进行组件的切换 */}
          <Scene key="index" component={AppIndex} hideNavBar={true} title="首屏页面"/>
          <Scene key="home" component={AppHome} hideNavBar={false} title="首页"></Scene>
          <Scene key="movie" component={AppMovie} hideNavBar={false} title="电影"></Scene>
          <Scene key="movieDetail" component={AppMovieDetail} hideNavBar={false} title="电影详情"></Scene>
          <Scene key="about" component={AppAbout} hideNavBar={false} title="关于"></Scene>
        </Stack>
      </Router>
    )
  }
}
