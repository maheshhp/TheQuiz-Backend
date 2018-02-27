'use strict';
module.exports = (sequelize, DataTypes) => {
  var question_option = sequelize.define('question_option', {
    question_id: DataTypes.INTEGER,
    option_name: DataTypes.STRING,
    option: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return question_option;
};