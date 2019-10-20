import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import apiConfig from '../../js/api_config.js';
import { Actions } from 'react-native-router-flux';

// 定义并导出组件
export default class App extends Component {

    constructor() {
        super();
        this.state = {
            hasLoading: true,
            movieList: []
        };
    }

    componentWillMount() {
        // 获取热映列表
        fetch(apiConfig.doubanHot)
            .then(rsp => rsp.json())
            .then(data => {
                this.setState({
                    hasLoading: false,
                    movieList: data.subjects
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
                        // 渲染电影列表
                        <ScrollView>
                            {
                                this.state.movieList.map(item => {
                                    return (
                                        <TouchableOpacity onPress={() => { Actions.movieDetail({id: item.id}) }} key={item.id}>
                                            <View style={{paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginBottom: 2}}>
                                                <Image style={{width:80, height:120}} source={{uri: item.images.small}}></Image>
                                                <View style={{justifyContent:'space-around', marginLeft: 10}}>
                                                    <Text>电影名称: {item.title}</Text>
                                                    <Text>上映年份: {item.year}</Text>
                                                    <Text>电影评分: {item.rating.average||0}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </ScrollView>  
                    )
                }
            </View>   
        );
    }
}
