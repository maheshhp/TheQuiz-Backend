const rp = require('request-promise');
const Models = require('../../models');

const getQuestionsAndAnswers = (callback) => {
  let questionsApiResponse = [];
  const answerFetchPromises = [];
  let insertToDbPromises = [];
  rp('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions')
    .then((quesResponse) => {
      questionsApiResponse = JSON.parse(quesResponse).allQuestions;
      questionsApiResponse.forEach((questionObject) => {
        Object.keys(questionObject).forEach((key) => {
          const stringKey = key.toString();
          if (stringKey.includes('option')) {
            insertToDbPromises.push(Models.question_option.create({
              question_id: questionObject.questionId,
              option_name: stringKey,
              option: questionObject[stringKey],
            }));
          }
        });
        answerFetchPromises.push(rp(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/${questionObject.questionId}`));
      });
      Promise.all(insertToDbPromises).then(() => {
        insertToDbPromises = [];
        Promise.all(answerFetchPromises).then((ansResponse) => {
          for (let i = 0; i < questionsApiResponse.length; i += 1) {
            insertToDbPromises[i] = Models.questions.create({
              question_id: questionsApiResponse[i].questionId,
              question: questionsApiResponse[i].question,
              answer: JSON.parse(ansResponse[i]).answer,
            });
          }
          Promise.all(insertToDbPromises).then(() => { callback('done'); });
        });
      });
    })
    .catch((error) => {
      console.log(error);
      callback('fail');
    });
};

module.exports = getQuestionsAndAnswers;
