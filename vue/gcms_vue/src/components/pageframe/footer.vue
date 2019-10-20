<template>
	<footer>
		
		<!-- 底部空间占位 -->
		<i></i>
		
		<!-- 底部table栏 =》MUI中tabBar选项卡 -->
		<nav class="mui-bar mui-bar-tab">
			
			<router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
				
			<router-link to="/goods/list" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
				<span class="mui-tab-label">商品购买</span>
			</router-link>

			<router-link to="/shopcart" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-express">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			
			<router-link to="/settings" class="mui-tab-item">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
			
		</nav>
		
	</footer>
</template>

<script>
	export default {
		
	};
</script>

<style scoped>
	
	footer > i {
		display: block;
		height: 50px;
	}
	
</style>