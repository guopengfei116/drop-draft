import React, { Component } from 'react';

// 导入antdUI组件
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 导入路由组件
import { Link, Route } from 'react-router-dom';

// 导入子组件
import MovieList from './sub/MovieList.js';
import MovieDetail from './sub/MovieDetail.js';

export default class Movie extends Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
              <Menu.Item key="1"><Link to="/movie/in_theaters">正在热映</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movie/coming_soon">即将上映</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/movie/top250">TOP250</Link></Menu.Item>
            </Menu>
        </Sider>
        <Layout style={{   }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            <Route exact path="/movie/:type" component={ MovieList } />
            <Route exact path="/movie/detail/:id" component={ MovieDetail } />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
