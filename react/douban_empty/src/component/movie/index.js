import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import apiConfig from '../../js/api_config.js';
import { Actions } from 'react-native-router-flux';

export default class AppMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasLoading: true,
            movieList: []
        };
    }

    componentWillMount() {
        // 获取热映电影列表
        fetch(apiConfig.doubanHot)
            .then(rsp => rsp.json())
            .then(data => {
                // 得用setState
                this.setState({
                    hasLoading: false,
                    movieList: data.subjects
                })
            })
    }

    render() {
        return (
            <View style={{paddingTop: 60}}>
                {
                    this.state.hasLoading
                    // 使用react-native内置的loading组件
                    ? <ActivityIndicator size={'large'} color={'blue'}></ActivityIndicator>
                    : (
                        // 渲染电影列表
                        <ScrollView>
                            {
                                this.state.movieList.map(item => {
                                    return (
                                        // 这里给onPress绑定事件回调时, 因为要手动传个id参数, 所以额外使用箭头函数包了一层
                                        <TouchableOpacity key={item.id} onPress={() => { Actions.movieDetail({id: item.id}) }}>
                                            <View style={{flexDirection: 'row', marginBottom: 4, paddingLeft: 10, paddingRight: 10}}>
                                                <Image style={{width:100, height: 200}} source={{uri: item.images.small}}></Image>
                                                <View style={{justifyContent: 'space-around', marginLeft: 10}}>
                                                    <Text style={{fontSize: 20, color: 'hotpink'}}>电影名称: {item.title}</Text>
                                                    <Text style={{fontSize: 20, color: 'hotpink'}}>上映年份: {item.year}</Text>
                                                    <Text style={{fontSize: 20, color: 'hotpink'}}>评价分数: {item.rating.average}</Text>
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
