app.controller('offerController',
  ['$scope', '$location', '$http', '$routeParams', 'Session',
  function($scope, $location, $http, $routeParams, Session) {

  $scope.accessToken = Session.getAccessToken();
  $scope.userId = Session.getUserId();

  $scope.seats = 4;
  $scope.dayofweek = 1;
  $scope.hour = 1;
  $scope.minute = 0;
  $scope.routes = [];
  $scope.chosenRoute = {};

  $scope.getLocationData = function() {
    var url = '/api/locations';
    return $http.get(url)
    .success(function(data) {
      data = data.map(function(datum) {
        datum.name = datum.from + ' -> ' + datum.to;
        return datum;
      });
      $scope.routes = data;
      $scope.chosenRoute = data[0];
    });
  };

  $scope.submit = function(slugId, numPeople) {
    console.log('submit');
    console.log($scope.seats);
    console.log($scope.dayofweek);
    console.log($scope.hour);
    console.log($scope.minute);
    console.log($scope.chosenRoute._id);
    var url = '/api/trail';
    var postData = {
      departure_day: $scope.dayofweek,
      departure_hour: $scope.hour,
      departure_minute: $scope.minute,
      location_id: $scope.chosenRoute._id,
      number_of_people: $scope.seats,
      user_token: $scope.userId
    };
    return $http.post(url, postData)
    .success(function(data) {
      console.log(data);
      // $location.path('/');
    });
  };

  $scope.getLocationData();

}]);
