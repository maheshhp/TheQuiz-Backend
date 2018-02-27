const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/update',
    handler: (request, response) => {
      Models.user_answer.findOne({
        where: {
          user_id: request.payload.user_id,
          question_id: request.payload.question_id,
        },
      }).then((foundObject) => {
        if (foundObject) {
          foundObject.updateAttributes({
            option: request.payload.option,
          }).then((updateObject) => {
            if (updateObject) {
              response({
                data: {
                  user_id: updateObject.user_id,
                  question_id: updateObject.question_id,
                  newOption: updateObject.option,
                },
                statusCode: 200,
              });
            } else {
              response({
                data: 'Error',
                statusCode: 500,
              });
            }
          });
        }
      }).catch((error) => {
        response({
          data: error,
          statusCode: 500,
        });
      });
    },
  },
];
