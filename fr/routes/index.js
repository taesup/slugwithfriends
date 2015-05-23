/* jshint node: true */
'use strict';
var path = require('path');
var Promise = require('bluebird');
var req = Promise.promisifyAll(require('request'));
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
    method: 'POST',
    path: '/api/saveLogin',
    config: {
      handler: function(request, reply) {
        var accessToken = request.payload.accessToken;
        var userId = request.payload.userId;
        console.log(accessToken);
        console.log(userId);
        return fb.friends(accessToken)
        .tap(console.log)
        .then(reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/api/friends',
    config: {
      handler: function(request, reply) {
        var accessToken = request.query.accessToken;
        var userId = request.query.userId;
        return fb.friends(accessToken)
        .tap(console.log)
        .then(reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/api/slugs',
    config: {
      handler: function(request, reply) {
        return req.getAsync('http://localhost:5000/slugs')
        .then(function(users) { return processRows(users); })
        .then(reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/api/locations',
    config: {
      handler: function(request, reply) {
        return req.getAsync('http://localhost:5000/locations')
        .then(function(users) { return processRows(users); })
        .then(reply);
      }
    }
  }
];


function processRows(rows) {
  var target = rows[1];
  target = JSON.parse(target);
  var items = target._items;
  return items;
}
