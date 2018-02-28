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
                      user_id: userData.id,
                    },
                  }));
                });
                Promise.all(getUserOptionForQuestion).then((userOptions) => {
                  console.log(userOptions);
                  const tempResponseObject = [];
                  for (let i = 0; i < questionsObject.length; i += 1) {
                    tempResponseObject.push({
                      userId: userData.id,
                      userName: userData.user_name,
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
          } else {
            const insertData = (res) => {
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
                        is_correct: 0,
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
            };
            Models.users.count().then((count) => {
              if (count === 0) {
                insertQuestionsToDB((res) => { insertData(res); });
              } else {
                insertData('done');
              }
            });
          }
        });
    },
  },
];
