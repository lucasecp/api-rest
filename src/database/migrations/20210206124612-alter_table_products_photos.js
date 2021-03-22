module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products',
    'price', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
    }, 'stock', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    }, 'category', {
      type: Sequelize.STRING,
      allowNull: false,
    }, 'sold', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    }),
  down: () => {},
};
