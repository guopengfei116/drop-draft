import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import AppIndex from './src/component/index';
import AppHome from './src/component/home';
import AppMovie from './src/component/movie';
import AppMovieDetail from './src/component/movie/movie_detail';
import AppAbout from './src/component/about';

// 定义并导出组件
export default class App extends Component {
    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene key="index" component={ AppIndex } hideNavBar={ true } initial={true} ></Scene>
                    <Scene key="home" component={ AppHome } hideNavBar={ false } title={ '首页' }></Scene>
                    <Scene key="movie" component={ AppMovie } hideNavBar={ false } title={ '电影' }></Scene>
                    <Scene key="movieDetail" component={ AppMovieDetail } hideNavBar={ false } title={ '电影详情' }></Scene>
                    <Scene key="about" component={ AppAbout } hideNavBar={ false } title={ '关于' }></Scene>
                </Stack>
            </Router>
        );
    }
}
