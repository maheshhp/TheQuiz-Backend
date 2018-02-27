const getQuestionsWithAnswers = require('./getQuestionsWithAnswers');
const updateAnswer = require('./updateAnswer');
const getLeaderBoard = require('getLeaderBoard');

module.exports = [].concat(getQuestionsWithAnswers, updateAnswer, getLeaderBoard);
