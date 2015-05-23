app.factory('Session', [function() {
  var userId = '';
  var accessToken = '';

  return {
    getAccessToken: function() { return accessToken; },
    setAccessToken: function(token) { accessToken = token; },
    getUserId: function() { return userId; },
    setUserId: function(id) { userId = id; }
  };
}]);
