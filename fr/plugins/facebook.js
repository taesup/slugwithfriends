var fb = {};
module.exports = fb;

var FB = require('fb');

FB.api('oauth/access_token', {
    client_id: 905205639542365,
    client_secret: 'acdb29d7fda9bc3bb96ef4f1ab679de1',
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



