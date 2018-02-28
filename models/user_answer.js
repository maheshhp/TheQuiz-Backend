module.exports = (sequelize, DataTypes) => {
  const user_answer = sequelize.define('user_answer', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    option: DataTypes.STRING,
    is_correct: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return user_answer;
};
