module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products',
    'sold', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
  down: () => {},
};
