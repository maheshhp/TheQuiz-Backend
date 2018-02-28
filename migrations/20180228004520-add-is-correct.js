module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('user_answers', 'is_correct', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('user_answers', 'is_correct');
  },
};
