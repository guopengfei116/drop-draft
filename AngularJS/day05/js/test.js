var app = angular.module('app', []);
    app.controller('appCtrl', ['$scope', function($scope) {
       $scope.val = 10;
    }]);

    app.directive('nglCounter', [function() {
      return {
        restrict: 'E',
        template: '<p ng-click="add()">{{ val }}</p>',
        controller: ['$scope', function($scope) {
          $scope.val = 0;
          $scope.add = function() {
            $scope.val++;
          };
        }]
      };
    }]);