const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/leaderBoard',
    handler: (request, response) => {
      response({
        data: 'Leaderboard',
        statusCode: 200,
      });
    },
  },
];
