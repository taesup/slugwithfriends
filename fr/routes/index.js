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
        return fb.friends(accessToken)
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
        .then(reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/api/slugs',
    config: {
      handler: function(request, reply) {
        var accessToken = request.query.accessToken;
        var userId = request.query.userId;
        var locationId = request.query.location;
        var url = 'http://localhost:5000/slugs?location=';
        url = url + locationId;
        return req.getAsync(url)
        .then(function(slugs) { return processRows(slugs); })
        // .then(function(slugs) {
          // return verifySlugs(slugs, accessToken, userId);
        // })
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
        .then(function(locations) { return processRows(locations); })
        .then(reply);
      }
    }
  },
  {
    method: 'GET',
    path: '/api/locations/{locationId}',
    config: {
      handler: function(request, reply) {
        var url = 'http://localhost:5000/locations/' + request.params.locationId;
        return req.getAsync(url)
        .then(processSingle)
        .then(reply);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/join',
    config: {
      handler: function(request, reply) {
        var slugId = request.payload.slugId;
        var numPeople = request.payload.numPeople;
        var options = {
          url: 'http://localhost:5000/slugs/' + slugId,
          method: 'PATCH',
          json: true,
          body: { number_of_people: numPeople }
        };
        return req.patchAsync(options)
        .then(processSingle)
        .then(reply);
      }
    }
  }
];

function processSingle(rows) {
  return rows[1];
}

function processRows(rows) {
  var target = rows[1];
  target = JSON.parse(target);
  var items = target._items;
  return items;
}

function verifySlugs(slugs, accessToken, userId) {
  var output = [];
  Promise.each(slugs, function(slug) {
    var userToken = slug.user_token;
    return fb.isFriends(accessToken, userId, userToken)
    .then(function() {
      output.push(slug);
    })
    .catch(function() {});
  });
  return output;
}
