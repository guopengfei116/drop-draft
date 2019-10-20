<template>
	<div class="tip">
		<h1>{{ msg }}</h1>
		<router-view></router-view>
		<a href="#/login">登陆</a>
		<a href="#/register">注册</a>
	</div>
</template>

<script>
	// 导出一个组件对象
	export default {
		data: function() {
			return {
				msg: '根组件演示'
			};
		}
	}
</script>

<style scoped>
	tip {
		color: red;
	}
</style>
