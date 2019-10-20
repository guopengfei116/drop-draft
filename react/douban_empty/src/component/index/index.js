// 导包
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppSwiper from '../common/swiper.js';
import { Actions } from 'react-native-router-flux';

export default class AppIndex extends Component {
  render() {
    return (
      <View>

        {/* 轮播图 */}
        <AppSwiper></AppSwiper>

        {/* 导航按钮 */}
        <View style={{flexDirection:'row', height: 50,
          justifyContent: 'space-around', backgroundColor: 'skyblue', alignItems: 'center'}}>
          <Text style={{fontSize: 20}} onPress={Actions.home}>首页</Text>
          <Text style={{fontSize: 20}} onPress={Actions.movie}>电影</Text>
          <Text style={{fontSize: 20}} onPress={Actions.about}>关于</Text>
        </View>

      </View>
    );
  }
}

// 定义样式, 这里的尺寸大小无需加单位, 元素可以通过数组引用多个样式, 后面的样式优先级比前面的高
const styles = StyleSheet.create({

});
