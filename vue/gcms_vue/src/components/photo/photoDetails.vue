<template>
	<section id="photo-details">
		
		<!-- 标题 => MintUI中Cell -->
		<mt-cell :title="details.title" v-bind="{ label: formatDate(details.add_time) + '  ' + details.click }"></mt-cell>
		
		<!-- 缩略图 =》 MUI中图文表格 -->
		<ul class="mui-table-view mui-grid-view">
	        <li v-for="item in thums" class="mui-table-view-cell mui-media mui-col-xs-4">
	        		<!-- 图片预览 =》vuePicturePreview插件 -->
	                <img class="mui-media-object" v-bind:src="item.src" v-preview="item.src">
	        </li>
	    </ul>
		
		<!-- 详细信息 -->
		<p class="content" v-html="details.content"></p>
		
	</section>
</template>

<script>
	import { HOST, WEB_API } from '../../js/config.js';
	import moment from 'moment';
	
	export default {
		
		data() {
			return {
				details: {},
				thums: []
			};
		},
		
		created() {
			this.getDetails();
			this.getThums();
		},
		
		methods: {
			
			// 获取图片详情
			getDetails() {
				var url = HOST + WEB_API.photoDetails.path + this.$route.params.id;
				this.$http.get(url).then(rep=>{
					if(rep.body.status === 0) {
						this.details = rep.body.message[0];
					}
				});
			},
			
			// 获取缩略图列表
			getThums() {
				var url = HOST +WEB_API.photoThumList.path + this.$route.params.id;
				this.$http.get(url).then(rep=>{
					if(rep.body.status === 0) {
						this.thums = rep.body.message;
					}
					// 手动添加本地图片
					this.thums.forEach((obj, i)=>{
						i %= 16;
						obj.src = '../src/img/' + i + '.jpg';
					});
				});
			},
			
			// 格式化时间
			formatDate(time) {
				return moment().format('YYYY-MM-DD hh-mm-ss');
			}
		}
	};
</script>

<style scoped>
	
	.mint-cell {
		padding: 10px 2px;
	}
	
	.content {
		padding: 10px;
	}
	
</style>
