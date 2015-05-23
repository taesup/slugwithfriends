var fb = {};
module.exports = fb;

var FB = require('fb');


FB.api('oauth/access_token', {
    client_id: 905091946220401,
    client_secret: '57726255633ffd7500f85ce8717e1635',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    var accessToken = res.access_token;
    console.log(accessToken);
});


fb.login = function(username, password) {
  FB.api('/562083638/friends', function (res) {
    if(!res || res.error) {
     console.log(!res ? 'error occurred' : res.error);
     return;
    }
    console.log(res);
  });
};



