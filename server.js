const Hapi = require('hapi');
const Routes = require('./src/routes');

const server = new Hapi.Server();

server.connection({
  port: 8090,
  host: 'localhost',
});

server.route(Routes);

if (!module.parent) {
  server.start((error) => {
    if (error) {
      throw (error);
    }
    console.log('Server started at port 8080');
  });
}

module.exports = server;
