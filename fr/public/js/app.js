var app = angular.module('SlugApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/login", {templateUrl: "/static/partials/login.html", controller: "slugController"})
  .when("/home", {templateUrl: "/static/partials/mainmenu.html", controller: "slugController"})
  .when("/offer", {templateUrl: "/static/partials/offering.html", controller: "offerController"})
  .when("/search", {templateUrl: "/static/partials/searching.html", controller: "searchController"})
  .when("/location/:locationId", {templateUrl: "/static/partials/location.html", controller: "locationController"})
  .when("/joined", {templateUrl: "/static/partials/joined.html"})
  .otherwise({redirectTo: '/login'});
  $locationProvider.html5Mode(true);
}]);
