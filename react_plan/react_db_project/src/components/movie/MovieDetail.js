/**
 * Created by liulongbin on 2017/4/27.
 */
import React from 'react'

import {Button, Icon, Spin, Alert} from 'antd';

// 导入获取数据的services
import MovieDataServices from '../../dataServices/getMovieData'

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: this.props.match.params.id, // 电影Id
            movieInfo: {}, // 电影详情信息
            isLoading:true // 正在加载中
        }
    }

    render() {
        return <div>
            <Button type="primary" onClick={this.goBack}>
                <Icon type="left"/>返回电影列表
            </Button>
            {this.createMovieDetail()}
        </div>
    }

    // 点击按钮，返回电影列表
    goBack = () => {
        // this.props.history.go(-1);
        this.props.history.goBack();
    }

    // 获取电影数据
    componentDidMount() {
        // 调用数据服务，得到一个promise对象
        var promise = MovieDataServices.getMovieDetailById(this.state.movieId);
        promise.then((data) => {
            this.setState({
                movieInfo:data,
                isLoading:false
            });
        });
    }

    // 显示电影详细数据到页面上
    createMovieDetail = () => {
        if(this.state.isLoading){
            return <Spin tip="Loading...">
                <Alert
                    message="正在请求电影列表数据..."
                    description="请稍等...."
                    type="info"
                />
            </Spin>
        }else{
            return <div>
                <h1 style={{textAlign:'center', margin:'10px'}}>{this.state.movieInfo.title}</h1>
                <div style={{textAlign:'center'}}>
                    <img src={this.state.movieInfo.images.large} alt=""/>
                </div>
                <h3 style={{margin:'15px 0'}}>主要演员：</h3>
                <ul style={{display:'flex'}}>
                    {this.state.movieInfo.casts.map(function (item, i) {
                        return <li key={i} style={{margin:'10px', textAlign:'center'}}>
                            <img src={item.avatars.small} alt=""/>
                            <h4>{item.name}</h4>
                        </li>
                    })}
                </ul>
                <h3 style={{margin:'15px 0'}}>剧情简介：</h3>
                <p style={{lineHeight:'30px', textIndent:'2em'}}>{this.state.movieInfo.summary}</p>
            </div>
        }
    }
}