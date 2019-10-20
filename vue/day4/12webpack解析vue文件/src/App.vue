<template>
	<div class="tip">{{ msg }}</div>
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
	.tip {
		color: red;
	}
</style>
