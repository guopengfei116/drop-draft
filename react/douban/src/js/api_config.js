const domain = 'http://vue.studyit.io/api';

export default {
    // 轮播图
    getLunbo: `${domain}/getlunbo`,

    // 豆瓣电影正在热映
    doubanHot: 'http://api.douban.com/v2/movie/in_theaters',
    

    // 豆瓣电影即将上映
    doubanSoon: 'http://api.douban.com/v2/movie/coming_soon',

    // 豆瓣电影top250
    doubanTop: 'http://api.douban.com/v2/movie/top250',

    // 豆瓣电影详情
    doubanDetail: 'http://api.douban.com/v2/movie/subject' // 后面需要id
};