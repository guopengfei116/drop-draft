<template>
	<div>
		<comHeader></comHeader>
		<router-view></router-view>
		<comFooter></comFooter>
	</div>
</template>

<script>
	import comHeader from './components/home/header.vue';
	import comFooter from './components/home/footer.vue';
	
	// 导出一个组件对象
	export default {
		data: function() {
			return {
				msg: '根组件演示'
			};
		},
		components: {
			comHeader,
			comFooter
		}
	}
</script>

<style scoped>

</style>
