<template>
	<nav id="swipe">

		<!-- 轮播图 => MintUI中的Swipe组件 -->
		<mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in imgs" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>

	</nav>
</template>

<script>
	export default {

		props: ['imgs']

	};
</script>

<style scoped>

	.mint-swipe {
	    height: 230px;
	}

	.mint-swipe img {
	    width: 100%;
	    height: 230px;
	}

</style>
