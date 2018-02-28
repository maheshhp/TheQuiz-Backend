const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/leaderBoard',
    handler: (request, response) => {
      const findUserAnswers = [];
      const scoreUpdatePromises = [];
      Models.users.findAll().then((users) => {
        users.forEach((user) => {
          findUserAnswers.push(Models.user_answer.findAll({
            where: {
              user_id: user.id,
            },
          }));
        });
        Promise.all(findUserAnswers).then((usersAnswers) => {
          usersAnswers.forEach((userAnswers) => {
            console.log('-----------------------');
            let tempUserScore = 0;
            userAnswers.forEach((userAnswer) => {
              if (userAnswer.is_correct === 1) {
                tempUserScore += 1;
              }
            });
            scoreUpdatePromises.push(Models.users.update({
              score: tempUserScore,
            }, {
              where: {
                id: userAnswers[0].user_id,
              },
            }));
            console.log('-----------------------');
          });
          Promise.all(scoreUpdatePromises).then((updateRes) => {
            console.log('Boooo==>', updateRes);
            Models.users.findAll({
              limit: 5,
              order: [['score', 'DESC']],
            }).then((result) => {
              response({
                data: result,
                statusCode: 200,
              });
            });
          });
        });
      })
        .catch((error) => {
          response({
            data: error,
            statusCode: 200,
          });
        });
    },
  },
];
