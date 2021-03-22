module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products',
    'stock', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
  down: () => {},
};
