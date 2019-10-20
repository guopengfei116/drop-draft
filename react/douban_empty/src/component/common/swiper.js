import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';  // 导入轮播图组件
import apiConfig from '../../js/api_config.js';

export default class AppSwiper extends Component {

    // 构造器这里可以拿到props参数
    constructor(props) {
        super(props);

        // es6定义状态的方式
        this.state = {
            lunboList: []
        }
    }

    // 挂载前是最早可以拿到state值的地方, 在这里请求接口
    componentWillMount() {
        // fetch是一个新的BOM对象, 属于浏览器的, 用于发送http请求
        fetch(apiConfig.getLunbo)
            .then(rsp => {
                return rsp.json();
                console.warn('接口数据正在解析')
            })
            .then(data => {
                this.setState({
                    lunboList: data.message
                });
                console.warn('接口数据请求完毕')
            })
            .catch((e) => {
                console.warn('接口失败')
            });
    }

    render() {
        return (
            <View style={{height:200}}>
                <Swiper autoplay={true} showsButtons={true}>
                    {
                        this.state.lunboList.map(item => {
                            return (
                                <View style={styles.slide1} key={item.img}>
                                    <Image style={{ width:'100%', height: '100%' }} 
                                        source={{uri: item.img}}></Image>
                                </View>
                            );
                        })
                    }
                </Swiper>  
            </View>
        );
    }
}

var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    }
  })
