<template>
	<section id="news-details">
		
		<!-- 新闻详情 => 使用Mui中的cardview卡片视图 -->
		<div class="mui-card">
			<div class="mui-card-header">
				<h4>{{ details.title }}</h4>
				<p class="add-time">{{ details.add_time | dateFormat }}</p>
				<p class="click">{{ details.click }}次预览</p>
			</div>
			<div class="mui-card-footer" v-html="details.content"></div>
		</div>
		
	</section>
</template>

<script>
	import { WEB_API } from '../../js/config.js';
	
	export default {
		
		data() {
			return {
				details: {}
			};
		},
		
		created() {
			this.getDetails();
		},
		
		methods: {
			
			// 获取新闻详情
			getDetails() {
				var url = WEB_API.newsDetails.url + this.$route.params.id;
				this.$http.get(url).then((rep)=>{
					if(rep.body.status === 0) {
						this.details = rep.body.message[0];
					}
				});
			},
			
			// 拼接页面label数据
			
		},
		
		computed: {
			label() {
				return this.details.click + '次点击  分类:民生经济 添加时间:' + this.details.add_time;
			}
		}
		
	}
</script>

<style scoped>
	
	.mui-card-header, .mui-card-content, .mui-card-footer {
		display: block;
	}
	
	.mui-card-header p {
		display: inline;
	}
	
</style>
