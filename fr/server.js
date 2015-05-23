var path = require('path');
var Hapi = require('hapi');
var Good = require('good');
var GoodConsole = require('good-console');

var options = {
  // cors disabled by default
  host: 'localhost',
  port: 8080,
  routes: {
    files: { relativeTo: path.normalize(__dirname + '/public') },
    validate: {
      options: { stripUnknown: true }
    },
    security: {
      hsts: true,
      xframe: true,
      xss: true,
      noOpen: true,
      noSniff: true
    }
  }
};
var server = new Hapi.Server();
var connection = server.connection(options);

// register server route logging
var consoleReporter = new GoodConsole({ log: '*', response: '*' });
var options = { reporters: [ consoleReporter ] };
server.register({ register: Good, options: options}, function (err) {
  if (err) { throw err; /* error loading logging the plugin */  }
});

// server routes
var routes = require(path.normalize(__dirname + '/routes'));
server.route(routes);

server.start(function () {
  server.log('info', 'server started @' + server.info.uri);
});
