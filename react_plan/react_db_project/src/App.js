/**
 * Created by liulongbin on 2017/4/27.
 */
import React from 'react'
// 引入Ant组件
import {Layout, Menu} from 'antd';
const {Header, Content, Footer} = Layout;

// 引入React-router-dom组件
import {HashRouter as Router, Link, Route} from 'react-router-dom'
// 导入自定义的组件
import HomeContainer from './components/home/HomeContainer'
import MovieContainer from './components/movie/MovieContainer'
import AboutContainer from './components/about/AboutContainer'

// 引入自己的样式表
import './css/App.css'

export default class App extends React.Component {
    render() {
        return <Router><Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/movie/in_theaters">电影</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/about">关于</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{height: '100%'}}>
                <div style={{background: '#fff', minHeight: 280, height: '100%'}}>
                    <Route exact path="/" component={HomeContainer}></Route>
                    <Route path="/movie" component={MovieContainer}></Route>
                    <Route path="/about" component={AboutContainer}></Route>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                传智播客 ©2017 黑马程序员
            </Footer>
        </Layout>
        </Router>
    }
}