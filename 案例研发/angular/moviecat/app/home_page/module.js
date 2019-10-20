(function(angular) {
	
	// 首页模块
	var app = angular.module('moviecat.home_page', ['ngRoute']);
	
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home_page', {
			templateUrl: '/home_page/view.html'
		});
	}]);
})(angular);
