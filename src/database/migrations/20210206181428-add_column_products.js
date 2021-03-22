module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products',
    'category', {
      type: Sequelize.STRING,
      allowNull: false,
    }),
  down: () => {},
};
