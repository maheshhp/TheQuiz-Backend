'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_answer = sequelize.define('user_answer', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    option: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_answer;
};