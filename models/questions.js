module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    question_id: DataTypes.INTEGER,
    question: DataTypes.STRING,
    option_name: DataTypes.STRING,
    answer: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return questions;
};
