console.log('route');
angular.module('SlugApp', [
  'SlugApp.services',
  'SlugApp.controllers',
  'ngRoute'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/", {templateUrl: "/static/partials/login.html", controller: "slugController"})
//  when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
  .otherwise({redirectTo: '/'});
}]);
