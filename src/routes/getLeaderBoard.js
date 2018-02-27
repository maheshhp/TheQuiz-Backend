const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/leaderBoard',
    handler: (request, response) => {
      Models.users.findAll({
        limit: 5,
        order: [['score', 'DESC']],
      }).then((result) => {
        response({
          data: result,
          statusCode: 200,
        });
      }).catch((error) => {
        response({
          data: error,
          statusCode: 200,
        });
      });
    },
  },
];
