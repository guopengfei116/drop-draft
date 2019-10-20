export default {

  // fetch方法封装，返回json方法的promise对象
  fetch(url) {
    return fetch(url).then(response => response.json());
  },

  // 获取电影列表数据，返回结果
  movieList(type){
    var url = '/v2/movie/' + type;
    return this.fetch(url);
  },

  // 根据电影Id获取电影详情，返回结果
  movieDetail(id){
    var url = '/v2/movie/?id=' + id;
    return this.fetch(url);
  }
}