<template>
	<div class="tip">
		<h1>{{ msg }}</h1>
		<v-login></v-login>
		<v-register></v-register>
	</div>
</template>

<script>
	import Login from './components/login.vue';
	import Register from './components/register.vue';
	
	// 导出一个组件对象
	export default {
		data: function() {
			return {
				msg: '根组件演示'
			};
		},
		components: {
			'v-login': Login,
			'v-register': Register
		}
	}
</script>

<style scoped>
	tip {
		color: red;
	}
</style>
