/**
 * Created by liulongbin on 2017/4/27.
 */
import React from 'react'

// 导入ANT组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 导入路由相关的组件
import {Link, Route} from 'react-router-dom'

// 导入自定义的组件
import MovieList from './MovieList.js'
import MovieDetail from './MovieDetail'

export default class MovieContainer extends React.Component{
    render(){
        return <Layout style={{height:'100%'}}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                >
                    <Menu.Item key="1"><Link to="/movie/in_theaters">正在热映</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/movie/coming_soon">即将上映</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/movie/top250">TOP250</Link></Menu.Item>
                </Menu>
            </Sider>

            <Layout style={{}}>
                <Content style={{ background: '#fff', padding: 10, margin: 0, minHeight: 280 }}>
                    {/*这是电影列表的路由规则*/}
                    <Route exact path="/movie/:type" component={MovieList}></Route>
                    {/*这是电影详情的路由规则*/}
                    <Route path="/movie/moviedetail/:id" component={MovieDetail}></Route>
                </Content>
            </Layout>
        </Layout>
    }
}