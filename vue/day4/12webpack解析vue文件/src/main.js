// 1、导入Vue核心包
import Vue from 'vue';

// 2、导入App根组件
import App from './App.vue'; 
import Login from './components/login.vue'; 
import Register from './components/register.vue'; 

// 3、创建vue实例，关联视图
let vm = new Vue({
	el: '#app',
	// 4、使用App根组件的视图替掉页面中的#app元素
	render: function(createElement) {
		return createElement(App);
	}
});

let vm2 = new Vue({
	el: '#app2',
	// 4、使用App根组件的视图替掉页面中的#app2元素
	render: function(createElement) {
		return createElement(App);
	}
});

console.log(App);
