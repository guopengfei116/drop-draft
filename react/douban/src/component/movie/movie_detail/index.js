import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import apiConfig from '../../../js/api_config.js';

// 定义并导出组件
export default class AppMovieDetail extends Component {

    constructor() {
        super();
        this.state = {
            hasLoading: true,
            movieDetail: {}
        };
    }

    componentWillMount() {
        // 获取电影详情
        fetch(apiConfig.doubanDetail)
            .then(rsp => rsp.json())
            .then(data => {
                this.setState({
                    hasLoading: false,
                    movieDetail: data
                })
            });
    }

    render() {
        return (
            <View style={{paddingTop: 60}}>
            {
                    this.state.hasLoading === true
                    ?
                        // 渲染loading
                        <ActivityIndicator size='large' color={'red'}></ActivityIndicator>
                    :(
                        <View>
                            <Text>{this.state.movieDetail.title}</Text>
                            <Image style={{width: '100%', height: 300}} 
                                source={{uri: this.state.movieDetail.images.large}}></Image>
                            <Text>{this.state.movieDetail.summary}</Text>
                        </View>
                    )
            }
            </View>
        );
    }
}
