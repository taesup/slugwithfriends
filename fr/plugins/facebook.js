var fb = {};
module.exports = fb;

var FB = require('fb');
var Promise = require('bluebird');

var client_id = '905205639542365';
var client_secret = 'acdb29d7fda9bc3bb96ef4f1ab679de1';

fb.isFriends = function(accessToken, originalUserId, otherUserId) {
  return new Promise(function(resolve, reject) {
    var url = '/' + originalUserId + '/friends/' + otherUserId + '?access_token=' + accessToken + '&' +
      'client_id=' + client_id;

    FB.api(url, function(response) {
      if (response && !response.error) { resolve(response);}
      else { reject(response); }
    });
  });
};

fb.friends = function(accessToken) {
  return new Promise(function(resolve, reject) {
    var url = '/me/friends?access_token=' + accessToken + '&' +
      'client_id=' + client_id;

    FB.api(url, function(response) {
      if (response && !response.error) { resolve(response); }
      else { reject(response); }
    });
  });
};
