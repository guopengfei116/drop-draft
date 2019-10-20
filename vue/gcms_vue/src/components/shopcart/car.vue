<template>
	<div id="tmpl">
		
		<div v-for="item in goodsBuyDetails" class="row">
			<mt-switch  v-model="item.isSelected"></mt-switch>
			<img class="img" v-bind:src="item.thumb_path">
			<div class="inforight">
				<h4>{{ item.title }}</h4>
				<div class="bottom">
					<ul>
						<li>￥{{ item.sell_price }}</li>
						<li>
							<v-numbox :initNum="goodsBuyNumbers[item.id]"></v-numbox>
						</li>
						<li><a href="javascript:void(0)">删除</a></li>
					</ul>
				</div>
			</div>
		</div>

		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品{{ totalBuyNumbers }}件,总价:￥{{ totalPrice }}元</li>
				</ul>
			</div>
			<div id="button">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import goodsBuyData from '../../js/goodsBuyData.js';
	import { HOST, WEB_API } from '../../js/config.js';
	
	export default {
		
		data() {
			return {
				goodsBuyNumbers: {}, // 记录每个商品购买数量
				goodsBuyDetails: [], // 购物车商品列表信息
			};
		},
		
		/**
		 * 每次组件在初始化的时候都要获取当前购买的商品数据
		 * */
		created() {
			this.initGoodsBuyNumbers();
			this.getGoodsBuyDetails();
		},
		
		methods: {
			
			// 获取每个商品购买的数量。
			initGoodsBuyNumbers() {
				var data = goodsBuyData.getAll();
				
				
				this.$set(this.goodsBuyNumbers , 'goodsBuyNumbers', 'and');

//				this.goodsBuyNumbers = goodsBuyData.getAll();
			},
			
			// 获取购物车商品对应商品信息列表
			getGoodsBuyDetails() {
				var ids = Object.keys(this.goodsBuyNumbers);
				var idsStr = ids.join(',');
				var url = WEB_API.shopcartList.url + idsStr;
				
				this.$http.get(url).then(rep=>{
					if(rep.body.status === 0) {
						
						// 手动添加本地图片，在goodsBuyDetails初始化时修改值可以让vue监听
						rep.body.message.forEach((obj, i)=>{
							obj.isSelected = true;
							i %= 16;
							obj.thumb_path = '../src/img/' + i + '.jpg';
						});
						
						this.goodsBuyDetails = rep.body.message;
					}
				});
			}
			
		},
		
		computed: {
			
			/**
			 * 商品购买总数计算属性
			 * 1、遍历所有购买的商品列表
			 * 2、每个商品判断是否开启了购买选项
			 * 3、如果勾选了那么总数++,最终返回总数
			 * */
			totalBuyNumbers() {
				var sum = 0;
				
				this.goodsBuyDetails.forEach((obj, i)=>{
					
					console.log(obj.isSelected);
					if(obj.isSelected) {
						sum++;
					}
					
				});
				
				return sum;
			},
			
			/**
			 * 总价格计算属性
			 * 1、遍历所有购买的商品详情
			 * 2、每个商品判断是否开启了购买选项
			 * 3、如果勾选了那么把获取该商品的价格 * 该商品购买数量求结果返回
			 * */
			totalPrice() {
				var sum = 0;
				
				this.goodsBuyDetails.forEach((obj, i)=>{
					
					if(obj.isSelected) {
						sum += obj.sell_price * this.goodsBuyNumbers[obj.id];
					}
					
				});
				
				return sum;
			}
		}
		
	};
</script>

<style scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 5px;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		margin-left: 5px;
		flex:1;
	}
	
	.inforight ul{
		padding-left: 0px;
	}
	
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}

	.bottom li:last-child{
		margin-left: 5px;
	}
	
	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}

	#total ul {
	 padding-left: 0px;
	}
	
	#total li{
		list-style: none;
		font-size: 14px;
	}

	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}

	.desc{

		flex:1;
	}
</style>