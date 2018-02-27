
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('question_options', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    question_id: {
      type: Sequelize.INTEGER,
    },
    option_name: {
      type: Sequelize.STRING,
    },
    option: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('question_options'),
};
