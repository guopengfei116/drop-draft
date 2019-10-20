<template>
	<main>
		<lg-preview></lg-preview>
		<comHeader></comHeader>
		<router-view></router-view>
		<comFooter></comFooter>
	</main>
</template>

<script>
	import comHeader from './components/pageframe/header.vue';
	import comFooter from './components/pageframe/footer.vue';

	// 导出一个组件对象
	export default {
		data: function() {
			return {};
		},
		components: {
			comHeader,
			comFooter
		}
	}
</script>

<style scoped>

</style>
