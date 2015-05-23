app.controller('slugController',
  ['$scope', '$location', 'Session', function($scope, $location, Session) {

  $scope.saveLogin = function(response) {
    Session.setUserId(response.userID);
    Session.setAccessToken(response.accessToken);
    $location.path('/home');
    $scope.$apply();
  };

}]);
