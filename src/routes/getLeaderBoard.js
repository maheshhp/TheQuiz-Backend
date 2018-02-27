const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/leaderBoard/{userId}',
    handler: (request, response) => {
      response({
        data: request.params.userId,
        statusCode: 200,
      });
    },
  },
];
