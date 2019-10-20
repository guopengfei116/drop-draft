import React, { Component } from 'react';

// 导入antdUI组件
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

// 导入路由组件
import {HashRouter as Router, Link, Route} from 'react-router-dom';

// 导入页面级组件
import Home from './component/home/Home.js';
import Movie from './component/movie/Movie.js';
import About from './component/about/About.js';

// 根组件定义
export default class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="layout" style={{ height: '100%' }}>
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movie">电影</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/about">关于</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ position: 'relative', }}>
            <div style={{ position: 'absolute', background: '#fff', width: '100%', 'min-height': '100%' }}>
              <Route exact path="/" component={ Home }/>
              <Route path="/movie" component={ Movie }/>
              <Route path="/about" component={ About }/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            传智播客 ©2017 黑马程序员
          </Footer>
        </Layout>
      </Router>
    );
  }
}
