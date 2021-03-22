module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('order_products_users',
    'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users_ecommerces',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),
  down: () => {},
};
