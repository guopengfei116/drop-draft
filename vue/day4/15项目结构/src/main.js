// 1、导入Vue核心包
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

// 1.1、手动把导入的Vue插件集成到Vue中
Vue.use(VueResource);
Vue.use(VueRouter);

// 2、导入我们自己开发的组件
import App from './App.vue';   // 这是整个项目的根组件
import Login from './components/login.vue';   // 登陆组件
import Register from './components/register.vue';   // 注册组件

// 3、创建vue实例，关联视图
let vm = new Vue({
	el: '#app',
	// 4、使用App根组件的视图替掉页面中的#app元素
	render: function(createElement) {
		return createElement(App);
	},
	router: new VueRouter({
		routes: [
			{ path: '/login', component: Login },
			{ path: '/register', component: Register },
		]
	})
});
