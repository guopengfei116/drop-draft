<template>
    <article>
        <!-- 分类导航 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">全部</li>
            <li class="mui-table-view-cell" v-for="item in categoryList" :key="item.id">
                <router-link v-bind="{ to: `/photo/list/${item.id}` }">{{ item.title }}</router-link>
            </li>
        </ul>

        <!-- 图片列表 -->
	 	<div class="mui-card" v-for="item in photoList" :key="item.id">
            <router-link :to="'/photo/detail/' + item.id">
                <div class="mui-card-header mui-card-media" :style="getStyle(item)"></div>
            </router-link>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                <p>{{ item.title }}</p>
                <p style="color: #333;">{{ item.zhaiyao }}</p>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.mui-table-view {
    overflow: hidden;
    &-cell {
        float: left;
    }
}
</style>