const Models = require('../../models');
const insertQuestionsToDB = require('../helpers/insertQuestionsToDB');

module.exports = [
  {
    method: 'GET',
    path: '/questions/{userName}',
    handler: (request, response) => {
      response({
        data: request.params.userName,
        statusCode: 200,
      });
    },
  },
];
