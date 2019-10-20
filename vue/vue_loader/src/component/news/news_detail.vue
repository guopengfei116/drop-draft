<template>
    <article>
        <div class="mui-card">
            <div class="mui-card-header">
                <h4>{{ newsDetail.title }}</h4>
                <p>
                    <span>发表于{{ newsDetail.add_time }}</span>
                    <span class="click">{{ newsDetail.click }}次预览</span>
                </p>
            </div>
            <div class="mui-card-footer" v-html="newsDetail.content"></div>
        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            newsDetail: []
        };
    },

    methods: {
        // 获取新闻详情, 需要注意接口返回的数据是一个数组
        getNewsDetail() {
            this.axios.get(this.api.newsD + this.id)
            .then( rsp => this.newsDetail = rsp.data.message[0] )
        }
    },

    // 上来就调用接口初始化数据
    created() {
        this.getNewsDetail();
    }
}
</script>

<style scoped>
/* 卡片视图默认是flex布局, 这里把它恢复正常 */
.mui-card-header, .mui-card-content, .mui-card-footer {
    display: block;
}
</style>