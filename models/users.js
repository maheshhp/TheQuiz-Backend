module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_name: DataTypes.STRING,
    score: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return users;
};
