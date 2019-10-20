<template>
    <article>
        <!-- mui的图文列表实现整体布局 -->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media"
            v-for="item in newsList" v-bind:key="item.id">
                <router-link v-bind="{ to: `/news/detail/${item.id}` }">
                    <img class="mui-media-object mui-pull-left" v-bind:src="item.img_url">
                    <div class="mui-media-body">
                        <!-- 使用mui-ellipsis类实现文本超越一行显示省略号 -->
                        <h4 class="mui-ellipsis">{{ item.title }}</h4>
                        <p class="mui-ellipsis">
                            <span>{{ item.add_time }}</span>
                            <span>浏览{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    data() {
        return {
            newsList: []
        };
    },

    methods: {
        // 获取新闻列表数据
        getNewsList() {
            this.axios.get(this.api.newsL)
            .then( rsp => this.newsList = rsp.data.message )
        }
    },

    // 上来就调用接口初始化数据
    created() {
        this.getNewsList();
    }
}
</script>

<style scoped>

</style>