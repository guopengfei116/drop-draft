<template>
	<section id="goods-details">
		
		<!-- 商品列表 =》卡片视图 MUI -->
		<ul class="goods-list">
			<li v-for="item in goods" class="mui-col-xs-6">
				<router-link v-bind='{ to: "/goods/details/" + item.id }'>
					<div class="mui-card">
						<div class="mui-card-header mui-card-media" :style="{ 'height': '150px',  'background-image': 'url('+ item.img_url +')' }"></div>
						<div class="mui-card-footer">
							<p>{{ item.title }}</p>
						</div>
						<div class="mui-card-content">
								<p class="price" style="color: #333;">
									<span>￥{{ item.sell_price }}</span>
									<s>￥{{ item.market_price }}</s>
								</p>
								<p class="tip">
									<span>热卖中</span>
									<span>剩余{{ item.stock_quantity }}件</span>
								</p>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
		
	</section>
</template>

<script>
	import { WEB_API } from '../../js/config.js';
	
	export default {
		
		data() {
			return {
				pageIndex: 1,
				goods: []
			};
		},
		
		created() {
			this.getGoods();
		},
		
		methods: {
			
			// 获取商品列表
			getGoods() {
				var url = WEB_API.goodsList.url + '?pageindex=' + this.pageIndex;
				this.$http.get(url).then(rep=>{
					if(rep.body.status === 0) {
						this.goods = rep.body.message;
					}
				});
			}
		}
	};
</script>

<style scoped>
	
	ul, li, p {
		margin: 0;
		padding: 0;
	}
	
	li {
		list-style: none;
	}
	
	.goods-list {
		overflow: hidden;
		padding: 8px 4px;
	}
	
	.goods-list li{
		float: left;
		margin-bottom: 6px;
	}
	
	.goods-list .mui-card {
		margin: 0 2px;
	}
	
	.mui-card-footer {
		height: 80px;
		overflow: hidden;
	}
	
	.mui-card-content {
		padding: 0 4px;
		text-align: center;
	}
	
	.mui-card-content .price {
		margin-bottom: 4px;
	}
	
	.mui-card-content .price span {
		color: red;
	}
	
	.mui-card-content .tip {
		overflow: hidden;
		padding: 0 8px;
	}
	
	.mui-card-content .tip span:first-child {
		float: left;
	}
	
	.mui-card-content .tip span:last-child {
		float: right;
	}
</style>