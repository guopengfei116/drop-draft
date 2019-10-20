var app = angular.module('app', []);
app.controller('appCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $http.get('http://139.199.192.48:8888/api/getprodlist')
      .then(function(response) {
        $scope.productList = response.data.message;
      });
  }
]);
