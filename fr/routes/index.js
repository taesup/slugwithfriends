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
    method: 'GET',
    path: '/test',
    config: {
      handler: function(request, reply) {
        fb.login('test', 'pass');
        reply();
      }  
    }
  }
];
