app.controller('slugController',
  ['$scope', '$location', '$http', 'Session',
  function($scope, $location, $http, Session) {

  $scope.saveLogin = function(response) {
    Session.setUserId(response.userID);
    Session.setAccessToken(response.accessToken);

    var postData = {
      userId: response.userID,
      accessToken: response.accessToken
    };
    $http.post('/api/saveLogin', postData)
    .success(function(data) {
      $location.path('/home');
    });
  };

  $scope.getLocations = function(response) {
    $http.get('/api/locations')
    .success(function(data) {
      console.log(data);
      $scope.locationData = data;
    });
  };

}]);
