/* jshint node: true */
'use strict';
var path = require('path');
var fb = require(path.normalize(__dirname + '/../plugins/facebook'));

module.exports = [
  {
    method: 'GET',
    path: '/static/{path*}',
    handler: {
      directory: {
        path: path.normalize(__dirname + '/../public'),
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/{path*}',
    handler: { file: 'index.html' }
  },
  {
    //
    method: 'POST',
    path: '/api/saveLogin',
    config: {
      handler: function(request, reply) {
        console.log(request.payload.accessToken);
        console.log(request.payload.userId);
        reply();
      }
    }
  }
];
