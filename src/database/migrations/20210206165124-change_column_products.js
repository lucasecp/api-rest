module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('products',
    'price', {
      type: Sequelize.DECIMAL(15, 2),
      allowNull: false,
    }, 'stock', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, 'category', {
      type: Sequelize.STRING,
      allowNull: false,
    }, 'sold', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }),
  down: () => {},
};
