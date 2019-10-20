const domain = 'http://vue.studyit.io/api';
const doubanDomain = 'http://api.douban.com/v2';

export default {
    // 轮播图
    getLunbo: `${domain}/getlunbo`,

    // 豆瓣热映电影列表
    doubanHot: `${doubanDomain}/movie/in_theaters`,
    
    // 豆瓣电影详情
    doubanDetail: `${doubanDomain}/movie/subject/`  // 接口后面需要加id参数
}
