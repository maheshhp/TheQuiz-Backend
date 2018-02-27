const Models = require('../../models');
const insertQuestionsToDB = require('../helpers/insertQuestionsToDB');

module.exports = [
  {
    method: 'GET',
    path: '/questions/{userName}',
    handler: (request, response) => {
      const createUserOptionEntries = [];
      const getQuestionWithOptions = [];
      const getUserOptionForQuestion = [];
      Models.users.findOne({
        where: {
          user_name: request.params.userName,
        },
      })
        .then((userData) => {
          if (userData) {
            Models.questions.findAll().then((questionsObject) => {
              console.log(questionsObject[0]);
            });
          } else {
            insertQuestionsToDB((res) => {
              if (res === 'done') {
                Models.questions.findAll().then((questionsObject) => {
                  Models.users.create({
                    user_name: request.params.userName,
                    score: 0,
                  }).then((user) => {
                    questionsObject.forEach((question) => {
                      createUserOptionEntries.push(Models.user_answer.create({
                        user_id: user.id,
                        question_id: question.question_id,
                        option: '',
                      }));
                    });
                    Promise.all(createUserOptionEntries).then(() => {
                      questionsObject.forEach((question) => {
                        getQuestionWithOptions.push(Models.question_option.findAll({
                          where: {
                            question_id: question.question_id,
                          },
                        }));
                      });
                      Promise.all(getQuestionWithOptions).then((questionsWithOptions) => {
                        questionsObject.forEach((question) => {
                          getUserOptionForQuestion.push(Models.user_answer.findOne({
                            where: {
                              question_id: question.question_id,
                            },
                          }));
                        });
                        Promise.all(getUserOptionForQuestion).then((userOptions) => {
                          const tempResponseObject = [];
                          for (let i = 0; i < questionsObject.length; i += 1) {
                            // console.log(questionsObject[i].question);
                            // console.log(questionsWithOptions[i].length);
                            // console.log(userOptions);
                            tempResponseObject.push({
                              userId: user.id,
                              userName: user.user_name,
                              questionId: questionsObject[i].question_id,
                              question: questionsObject[i].question,
                              questionOptions: questionsWithOptions[i],
                              userOption: userOptions[i],
                            });
                          }
                          response({
                            data: tempResponseObject,
                            statusCode: 200,
                          });
                        });
                      });
                    });
                  });
                });
              } else {
                response({
                  data: { error: 'Internal error' },
                  statusCode: 500,
                });
              }
            });
          }
        });
    },
  },
];
