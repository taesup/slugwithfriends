var fb = {};
module.exports = fb;

var FB = require('fb');

FB.api('4', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  console.log(res.id);
  console.log(res.name);
});

fb.login = function(username, password) {
  console.log(username);
  console.log(password);
};