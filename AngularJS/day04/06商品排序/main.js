var app = angular.module('app', []);
app.controller('appCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {

    // 获取商品列表
    $scope.getProductList = function() {
      $http.get('http://139.199.192.48:8888/api/getprodlist')
      .then(function(response) {
        $scope.productList = response.data.message;
      });
    };
    $scope.getProductList();

    // 添加新商品
    $scope.newProductName = '';
    $scope.addProduct = function() {
      $http({
        url: 'http://139.199.192.48:8888/api/addproduct',
        method: 'post',
        data: 'name=' + $scope.newProductName,
        headers: {
          'Content-Type':  'application/x-www-form-urlencoded'
        }
      })
      .then(function(response) {
        $scope.getProductList();
      });
    };

    // 删除商品
    $scope.removeProduct = function(id, index) {
      $http.get('http://139.199.192.48:8888/api/delproduct/' + id)
      .then(function(response) {
        $scope.productList.splice(index, 1);
      });
    };

    // 商品搜索关键字
    $scope.filterKeyword = '';

    // 商品排序规则
    $scope.orderbyRule = {
      key: '',
      order: false
    };
    // 如果当前key不变，证明用户想要修改顺序，
    // 否则就是修改排序参考基准
    $scope.upOrderbyRule = function(key) {
      if($scope.orderbyRule.key === key) {
        $scope.orderbyRule.order = !$scope.orderbyRule.order;
      }else {
        $scope.orderbyRule.key = key;
      }
    };
  }
]);
