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
        console.log(request.payload.accessToken);
        console.log(request.payload.userId);
        reply();
      }
    }
  },
  {
    method: 'GET',
    path: '/api/slugs',
    config: {
      handler: function(request, reply) {
        req.getAsync('http://localhost:5000/slugs')
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
        req.getAsync('http://localhost:5000/locations')
        .then(function(users) { return processRows(users); })
        .then(reply);
      }
    }
  }
];


function processRows(rows) {
  rows.shift();
  rows = rows.map(function(row) {
    return JSON.parse(row)._items;
  });
  return rows;
}
