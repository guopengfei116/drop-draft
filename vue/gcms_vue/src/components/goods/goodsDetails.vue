<template>
	<section id="goods-details">
		
		<!-- 商品轮播图 => 引用自定义的全局组件 -->
		<v-swipe :imgs="thums"></v-swipe>
		
		<!-- 商品购买 => Mui中的卡片视图 -->
		<div class="mui-card">
			<div class="mui-card-header">{{ details.title }}</div>
			<div class="mui-card-content mui-card-content-inner">
				<div class="price" style="color: rgb(51, 51, 51);">
					<s>市场价:￥{{ details.market_price }}</s>
					<span>销售价: </span>
					<em>￥{{ details.sell_price }}</em>
				</div>
				<div>
					<span>购买数量：</span>
					<!-- 引用公共数字输入框组件 -->
					<v-numbox evm="evm" @change="upBuyTotal"></v-numbox>
				</div>
			</div>
			<div class="mui-card-footer">
				<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined">购买</button>
				<div></div>
				<button type="button" class="mui-btn mui-btn-success mui-btn-block mui-btn-outlined" @click="addShopcart">加入购物车</button>
			</div>
		</div>
		
	</section>
</template>

<script>
	import { WEB_API } from '../../js/config.js';
	import goodsBuyData from '../../js/goodsBuyData.js';

	export default {
		
		data() {
			return {
				thums: [],
				details: {},
				buyTotal: 0
			};
		},
		
		created() {
			this.getThums();
			this.getDetails();
		},
		
		methods: {
			
			// 获取缩略图列表，使用轮播图展示
			getThums() {
				var url = WEB_API.photoThumList.url + this.$route.params.id;
				
				this.$http.get(url).then(rep=>{
					
					if(rep.body.status === 0) {
						this.thums = rep.body.message;
					}
					
					// 手动添加本地图片，并把src属性值转换为img，
					// 因为轮播图组件是通过img属性获取图片地址
					this.thums.forEach((obj, i)=>{
						i %= 16;
						obj.src = '../src/img/' + i + '.jpg';
						obj.img = obj.src;
					});
					
				});
			},
			
			// 获取商品详细信息
			getDetails() {
				var url = WEB_API.goodsDetails.url + this.$route.params.id;
				
				this.$http.get(url).then(rep=>{
					
					if(rep.body.status === 0) {
						this.details = rep.body.message[0];
					}
					
				});
			},
			
			// 监听到输入框值的变化，实时更新购买总量
			upBuyTotal(total) {
				this.buyTotal = total;
			},
			
			// 根据购买总量添加到购物车
			addShopcart() {
				console.log(this.buyTotal);
				goodsBuyData.set(this.details.id, this.buyTotal);
			}
		}
		
	};
</script>

<style>
	
	.mui-card-footer div{
		width: 100%;
	}
	
	.mui-card-footer .mui-btn {
		padding: 8px 0;
		font-size: 16px;
	}
	
	.mui-card-content .price {
		margin-bottom: 4px;
	}
	
	.mui-card-content .price span {
		margin-left: 6px;
	}
	
	#goods-details .price em {
		font-size: 18px;
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