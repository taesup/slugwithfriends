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


  var intToDay = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
  };
  $scope.getSlugs = function(response) {
    var url = '/api/slugs?accessToken=' + $scope.accessToken + '&' +
      'userId=' + $scope.userId + '&location=' + $scope.locationId;
    return $http.get(url)
    .success(function(data) {
      data = data.map(function(datum) {
        datum.day_string = intToDay[datum.departure_day];
        return datum;
      });
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
