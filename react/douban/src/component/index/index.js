import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import AppSwiper from '../common/swipe.js';
import { Actions } from 'react-native-router-flux';

// 定义并导出组件
export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppSwiper></AppSwiper>
                <View style={{flexDirection:'row', justifyContent:'space-around', 
                    height: 40, backgroundColor: 'skyblue', alignItems: 'center'}}>
                    <Text onPress={ Actions.home }>首页</Text>
                    <Text onPress={ Actions.movie }>电影</Text>
                    <Text onPress={ Actions.about }>关于</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
