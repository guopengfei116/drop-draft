import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import apiConfig  from '../../../js/api_config.js';

export default class AppMovieDetail extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            hasLoading: true,
            movieDetail: {}
        }
    }

    componentWillMount() {
        // 获取电影详情, 需要后面加上ID
        fetch(apiConfig.doubanDetail + this.props.id)
            .then(rsp => rsp.json())
            .then(data => {
                this.setState({
                    hasLoading: false,
                    movieDetail: data
                });
            });
    }

    render() {
        return (
            <View style={{paddingTop: 60}}>
                {
                    this.state.hasLoading
                    // 使用react-native内置的loading组件
                    ? <ActivityIndicator size={'large'} color={'blue'}></ActivityIndicator>
                    : (
                        <View style={{paddingLeft: 10, paddingRight: 10}}>
                            <Image style={{width:'100%', height: 200}} source={{uri: this.state.movieDetail.images.large}}></Image> 
                            <View style={{marginTop: 10}}>
                                <Text>电影名称: { this.state.movieDetail.title }</Text>
                                <Text>电影评分: { this.state.movieDetail.rating.average }</Text>
                                <Text>电影描述: { this.state.movieDetail.summary }</Text>
                            </View>
                        </View>
                    )
                }
            </View>
        );
    }

}
