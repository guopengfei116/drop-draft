<template>
	<section id="news-list">
		
		<!-- 新闻列表 => 使用Mui中的mediaList图文列表  -->
		<div class="mui-card">
			<ul class="mui-table-view mui-table-view-chevron">
				<!-- 遍历渲染列表 -->
				<li v-for="item in news" class="mui-table-view-cell mui-media">
					<!-- 动态添加href属性 -->
					<a v-bind="{ href: '#/news/details/' + item.id }" class="mui-navigate-right">
						<!-- 动态添加src属性 -->
						<img v-bind:src="item.img_url" class="mui-media-object mui-pull-left">
						<div class="mui-media-body">
							<h4 class="mui-ellipsis">{{ item.title }}</h4>
							<div>
								<p>{{ item.add_time | dateFormat('YYYY-MM-DD') }}</p>
								<p>浏览{{ item.click }}次</p>
							</div>
						</div>
					</a>
				</li>
			</ul>
		</div>
		
	</section>
</template>

<script>
	import { WEB_API } from '../../js/config.js';
	
	export default {
		
		data() {
			return {
				news: []
			};
		},
		
		created() {
			this.getNews();
		},
		
		methods: {
			
			// 获取新闻列表
			getNews() {
				var url = WEB_API.newsList.url;
				this.$http.get(url).then(rep=>{
					if(rep.body.status === 0) {
						this.news = rep.body.message;
					}
				});
			}
		}

	};
</script>

<style>
	
	#news-list .mui-media-body p {
		display: inline;
	}
	
</style>
