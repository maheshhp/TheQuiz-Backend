const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/update',
    handler: (request, response) => {
      response({
        data: request.payload,
        statusCode: 200,
      });
    },
  },
];
