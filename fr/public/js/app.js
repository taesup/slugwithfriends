var app = angular.module('SlugApp', ['ngRoute' ]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/login", {templateUrl: "/static/partials/login.html", controller: "slugController"})
  .when("/home", {templateUrl: "/static/partials/mainmenu.html", controller: "slugController"})
  .when("/offer", {templateUrl: "/static/partials/offering.html", controller: "slugController"})
  .when("/search", {templateUrl: "/static/partials/searching.html", controller: "slugController"})
  .otherwise({redirectTo: '/login'});
}]);
