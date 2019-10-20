<template>
	<section id="home">
		
		<!-- 商品轮播图 => 引用自定义的全局组件 -->
		<v-swipe :imgs="imgs"></v-swipe>
        
        <!-- 图表导航 => 引用Mui实例中的九宫格 -->
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#/news/list">
			    <span class="mui-icon mui-icon-chat"></span>
			    <div class="mui-media-body">新闻咨询</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#/photo/list">
			    <span class="mui-icon mui-icon-image"></span>
			    <div class="mui-media-body">图片分享</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-search"></span>
			    <div class="mui-media-body">搜一搜</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-compose"></span>
			    <div class="mui-media-body">留言反馈</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-phone"></span>
			    <div class="mui-media-body">联系我们</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-info"></span>
			    <div class="mui-media-body">关于我们</div></a>
			</li>
		</ul> 
		
	</section>	
</template>

<script>
	import http from '../../js/http.js';
	
	export default {
	    data() {
	        return {
	            imgs: []
	        };
	    },
	    created() {
	    	// 获取图片列表，这里要使用外面的this，所以使用箭头函数
	    	http.swipePhotoList((message)=>{
	    		 this.imgs = message;
	    	});
	    }
	}
</script>

<style scoped>
	.mint-swipe {
	    height: 230px;
	}
	
	.mint-swipe img {
	    width: 100%;
	    height: 230px;
	}
</style>
