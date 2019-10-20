// 导入受路由控制的组件
import HomeComponent from '../component/home/home.vue';
import NewsListComponent from '../component/news/news_list.vue';
import NewsDetailComponent from '../component/news/news_detail.vue';
import PhotoListComponent from '../component/photo/photo_list.vue';
import PhotoDetailComponent from '../component/photo/photo_detail.vue';

// 导出路由配置
export default {
    routes: [
        // 首页路由配置
        { path: "/", redirect: "/index" },
        { name: "i", path: "/index", component: HomeComponent },

        // 新闻路由配置
        { name: "nl", path: "/news/list", component: NewsListComponent },
        { name: "nd", path: "/news/detail/:id", component: NewsDetailComponent },

        // 图片路由配置
        { name: "pl", path: "/photo/list/:id", component: PhotoListComponent },
        { name: "pd", path: "/photo/detail/:id", component: PhotoDetailComponent },
    ]
};
