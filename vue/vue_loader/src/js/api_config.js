const domain = 'http://vue.studyit.io/api';

export default {

    // 获取轮播图的接口
    lunB: `${domain}/getlunbo/`,

    // 新闻相关接口
    newsL: `${domain}/getnewslist/`,
    newsD: `${domain}/getnew/`,          // 该接口后面需要一个新闻id: /getnew/:id

    // 图片相关接口
    photoC: `${domain}/getimgcategory/`,
    photoL: `${domain}/getimages/:id`,      // 该接口后面需要一个分类id: /getimages/:id
    photoD: `${domain}/getimageinfo/:id`,   // 该接口后面需要一个图片id: /getimageinfo/:id
    photoT: `${domain}/getthumimages/:id`,  // 该接口后面需要一个图片id: /getthumimages/:id

    // 商品相关接口

    // 评论相关接口
};
