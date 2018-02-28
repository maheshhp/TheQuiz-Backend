const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/update',
    handler: (request, response) => {
      console.log(request.payload);
      Models.user_answer.findOne({
        where: {
          user_id: request.payload.user_id,
          question_id: request.payload.question_id,
        },
      }).then((foundObject) => {
        if (foundObject) {
          console.log(foundObject);
          Models.questions.findOne({
            where: {
              question_id: request.payload.question_id,
            },
          }).then((questionObject) => {
            if (questionObject.answer === request.payload.option) {
              foundObject.updateAttributes({
                option: request.payload.option,
                is_correct: 1,
              }).then((updateObject) => {
                if (updateObject) {
                  response({
                    data: {
                      user_id: updateObject.user_id,
                      question_id: updateObject.question_id,
                      newOption: updateObject.option,
                      is_correct: updateObject.is_correct,
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
            } else {
              foundObject.updateAttributes({
                option: request.payload.option,
                is_correct: 0,
              }).then((updateObject) => {
                if (updateObject) {
                  response({
                    data: {
                      user_id: updateObject.user_id,
                      question_id: updateObject.question_id,
                      newOption: updateObject.option,
                      is_correct: updateObject.is_correct,
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
