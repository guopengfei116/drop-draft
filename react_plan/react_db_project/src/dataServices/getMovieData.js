/**
 * Created by liulongbin on 2017/4/27.
 */
export default {
    getMovieListByType(type){ // 根据电影类型，获取电影列表数据
        // 根据传递过来的电影类型，拼接真正的数据URL地址：
        var url = '/getmovielist?type=' + type;
        // 这种写法固然可以，但是return次数比较多，不容易理解，容易乱，所以不推荐！！！
        /*return fetch(url).then(function (response) {
         return response.json();
         }).then(function (data) {
         return data;
         });*/

        // 推荐将Promise和fetch结合使用
        return new Promise(function (resolve, reject) {
            // 在内部执行异步操作
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data);
            });
        });
    },
    getMovieDetailById(id){// 根据电影Id，获取对应的电影详情
        var url = '/getmoviedetail?id=' + id;
        return new Promise(function (resolve, reject) {
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                resolve(data);
            });
        });
    }
}