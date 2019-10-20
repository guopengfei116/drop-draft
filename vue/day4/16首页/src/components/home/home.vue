<template>
	<section>
		<mt-swipe :auto="4000">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-chat"></span>
			    <div class="mui-media-body">新闻咨询</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-image"><span class="mui-badge">5</span></span>
			    <div class="mui-media-body">图片分享</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
			    <div class="mui-media-body">商品购买</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-compose"></span>
			    <div class="mui-media-body">留言反馈</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-search"></span>
			    <div class="mui-media-body">搜一搜</div></a>
			</li>
			<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
			    <span class="mui-icon mui-icon-phone"></span>
			    <div class="mui-media-body">联系我们</div></a>
			</li>
		</ul> 
	</section>	
</template>

<script>
export default {
    data() {
        return {
            imgs: []
        }
    }, created() {
        this.$http.get(this.config.apiPath + '/api/getlunbo')
            .then(res => {
                // console.log(res.body);
                this.imgs = res.body.message;
            }, res => {
                console.log('获取图片资源失败');
            })
    }
}
</script>

<style>
</style>