 <template>
 	<section id="photo-list">

 		<!-- 图片分类导航 -->
 		<ul class="category">
	 		<li @click="getPhotos(0)">全部</li>
	 		<li v-for="item in categorys" @click="getPhotos(item.id)">{{ item.title }}</li>
	 	</ul>
	 	
	 	<!-- 图片列表 -->
	 	<ul class="photo-list">
	 		<li v-for="item in photos">
	 			<a v-bind="{ href: '#/photo/details/' + item.id }">
	 				<img v-lazy="item.img_url">
	 				<!--<img :src="item.img_url">-->
		 			<div class="content">
		 				<p>{{ item.title }}</p>
		 				<p>{{ item.zhaiyao }}</p>
		 			</div>
	 			</a>
	 		</li>
	 	</ul>
	 	<div v-if="!photos.length">暂无，尽情期待</div>
	 	
 	</section>
</template>

<script>
	import { HOST, WEB_API } from '../../js/config.js';
	
	export default {
		
		data() {
			return {
				categorys: [],
				photos: []
			};
		},

		created() {
			this.getCategorys();
			this.getPhotos();
		},
		
		methods: {
			
			// 获取分类列表
			getCategorys() {
				var url = HOST + WEB_API.photoCategoryList.path;
				this.$http.get(url).then((rep)=>{
					if(rep.body.status == 0) {
						this.categorys = rep.body.message;
					}
				});
			},
			
			// 获取图片列表
			getPhotos(id) {
				id = id || 0;
				var url = HOST + WEB_API.photoList.path + id;
				this.$http.get(url).then((rep)=>{
					if(rep.body.status === 0) {
						this.photos = rep.body.message;
					}
					// 手动添加本地图片
					this.photos.forEach((obj, i)=>{
						i %= 16;
						obj.img_url = '../src/img/' + i + '.jpg';
					});
				});
			}
			
		}
	};
</script>

<style scoped>
	
	/* 页面框架样式 */
	#photo-list {
		padding: 2px 6px;
	}
	
	ul, li {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	/* 图片导航样式 */
	.category {
		margin: 0;
		padding: 4px 0;
		overflow: hidden;
	}
	
	.category:after, .category:before {
		content: '1';
		font-size: 0;
	}
	
	.category > li {
		list-style: none;
		float: left;
		margin: 4px;
		font-size: 12px;
		color: deepskyblue;
	}
	
	/* 图片列表样式 */
	.photo-list > li{
		position: relative;
	}
	
	.photo-list > li  img {
		width: 100%;
	}
	
	.photo-list > li .content {
		position: absolute;
		margin: 0;
		padding: 6px 4px;
		width: 100%;
		bottom: 4px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.5);
		height: 40px;
	}
	
	.photo-list > li .content  p:first-child {
		color: #ffffff;
	}
	
	.photo-list > li .content p {
		margin: 0;
		font-size: 12px;
		line-height: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space:nowrap;
	}
	
	/* 未加载图片loading样式 */
	.photo-list > li img[lazy=loading] {
		display: block;
		margin: 0 auto;		
	    width: 40px;
	    height: 300px;
	    line-height: 300px;
	}
	
</style>
