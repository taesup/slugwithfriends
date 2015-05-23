app.controller('searchController',
  ['$scope', '$location', '$http', 'Session',
  function($scope, $location, $http, Session) {

  $scope.locationData = [];
  $scope.getLocations = function(response) {
    return $http.get('/api/locations')
    .success(function(data) {
      $scope.locationData = data;
    });
  };

  $scope.getLocations();

}]);
