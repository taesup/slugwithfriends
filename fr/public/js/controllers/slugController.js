app.controller('slugController',
  ['$scope', 'Session', function($scope, Session) {

  $scope.saveLogin = function(userId, accessToken) {
    console.log(userId);
    console.log(accessToken);

    Session.setUserId(userId);
    Session.setAccessToken(accessToken);
  };

}]);
