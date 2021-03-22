module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('users',
    'admin', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }),
  down: () => {},
};
