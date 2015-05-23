app.controller('locationController',
  ['$scope', '$location', '$http', '$routeParams', 'Session',
  function($scope, $location, $http, $routeParams, Session) {

  $scope.slugData = [];
  $scope.locationId = $routeParams.locationId;
  $scope.accessToken = Session.getAccessToken();
  $scope.userId = Session.getUserId();
  $scope.locationData = {};

  $scope.getLocation = function() {
    var url = '/api/locations/' + $scope.locationId;
    return $http.get(url)
    .success(function(data) {
      $scope.locationData = data;
    });
  };

  $scope.getSlugs = function(response) {
    var url = '/api/slugs?accessToken=' + $scope.accessToken + '&' +
      'userId=' + $scope.userId + '&location=' + $scope.locationId;
    return $http.get(url)
    .success(function(data) {
      $scope.slugData = data;
    });
  };

  $scope.joinSlug = function(slugId, numPeople) {
    numPeople = numPeople - 1;
    if (numPeople < 1) { alert('There are no more slots!'); return; }
    var url = '/api/join';
    var postData = {
      slugId: slugId,
      numPeople: numPeople
    };
    return $http.post(url, postData)
    .success(function(data) {
      $location.path('/joined');
    });
  };

  $scope.getLocation();
  $scope.getSlugs();

}]);
