// 1、导入Vue核心包
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

// 1.1、手动把导入的Vue插件集成到Vue中
Vue.use(VueResource);
Vue.use(VueRouter);

// 1.2、导入mui样式库
import '../lib/mui/css/mui.css';
import '../lib/mui/css/icons-extra.css';

// 1.3、导入mintUI组件与样式库
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 2、导入我们自己开发的组件
import App from './App.vue';   // 整个项目的根组件
import comHome from './components/home/home.vue';   // 项目首页

// 3、创建vue实例，关联视图
let vm = new Vue({
	el: '#app',
	// 4、使用App根组件的视图替掉页面中的#app元素
	render: function(createElement) {
		return createElement(App);
	},
	router: new VueRouter({
		routes: [
			{ path: '/', component: comHome }
		]
	})
});
