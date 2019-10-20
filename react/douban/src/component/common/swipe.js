import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import apiConfig from '../../js/api_config.js';

// 定义并导出组件
export default class AppSwiper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lunbos: [],
            imgUrl: {uri: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg'}
        }
    }

    // 给每个对象里面添加uri属性, 以便设置给Image组件
    transformLunbos(lunbos) {
        return lunbos.map(item => {
            item.uri = item.img;
            return item;
        });
    }

    componentWillMount() {
        // 请求轮播图数据
        fetch(apiConfig.getLunbo)
            .then(rsp => rsp.json())
            .then(data => { 
                this.setState({
                    lunbos: this.transformLunbos(data.message)
                });
            }
        );
    }

    render() {
        return (
            <View style={{height: 200}}>
                <Swiper showsButtons={true} height={160} autoplay={true}>
                    {
                        this.state.lunbos.map(item => {
                            return (
                                <View style={styles.slide} key={item.uri}>
                                    <Image style={{height:'100%', width:'100%'}} source={item}></Image>
                                </View>
                            );
                        })
                    }
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    }
});
