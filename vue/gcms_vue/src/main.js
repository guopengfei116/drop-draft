// 一、引包 

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

// 1.3、导入mintUI组件与样式库，因为mintUI是Vue组件所以需要sue
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 1.4、导入图片预览插件，因为是Vue组件所以需要sue
import picturePreview from 'vue-picture-preview';
Vue.use(picturePreview);

// 1.5、导入日期格式化插件
import moment from 'moment';

// 二、导入我们自己开发的组件

// 2.1、整个项目的根组件
import App from './App.vue';  

// 2.2、首页组件
import comHome from './components/home/home.vue'; 

// 2.3、图片分享相关页面组件
import photoList from './components/photo/photoList.vue';  // 图片列表
import photoDetails from './components/photo/photoDetails.vue';  // 图片详情

// 2.4、商品相关页面组件
import goodsList from './components/goods/goodsList.vue';  // 商品列表
import goodsDetails from './components/goods/goodsDetails.vue';  // 商品详情

// 2.5、新闻相关页面组件
import newsList from './components/news/newsList.vue';  // 新闻列表
import newsDetails from './components/news/newsDetails.vue';  // 新闻详情

// 2.6、轮播图组件
import swipe from './components/common/swipe.vue';

// 2.7、数字输入框组件
import numbox from './components/common/numbox.vue';


// 购物车
import shopcart from './components/shopcart/car.vue';  

// 三、定义全局组件、过滤器等

// 3.1、全局日期格式化过滤器
Vue.filter('dateFormat', (source, fm)=>{
	fm = fm || 'YYYY-MM-DD hh:mm:ss';
	return moment(source).format(fm);
});

// 3.2、全局轮播图组件
Vue.component('v-swipe', swipe);

// 3.3、全局数字输入框组件
Vue.component('v-numbox', numbox);

// 四、创建vue实例
let vm = new Vue({
	
	// 4.1、关联视图
	el: '#app',
	
	// 4.2、使用App根组件渲染视图
	render: function(createElement) {
		return createElement(App);
	},
	
	// 4.3、配置页面路由，根据url切换子组件
	router: new VueRouter({
		
		// router-link点击时动态添加的class
		linkActiveClass: 'mui-active',
		
		// 路由配置
		routes: [
		
			// 首页路由
			{ path: '/', redirect: '/home' },
			{ path: '/home', component: comHome },
			
			// 图片分享相关路由
			{ path: '/photo/list', component: photoList },
			{ path: '/photo/details/:id', component: photoDetails },
			
			// 商品购买相关路由
			{ path: '/goods/list', component: goodsList },
			{ path: '/goods/details/:id', component: goodsDetails },
			 
			// 新闻咨询相关路由
			{ path: '/news/list', component: newsList },
			{ path: '/news/details/:id', component: newsDetails },
			
			{ path: '/shopcart/', component: shopcart },
			
		]
		
	})
});
