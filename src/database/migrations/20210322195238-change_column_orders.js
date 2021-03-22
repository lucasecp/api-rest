module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('order_products_users',
    'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users_ecommerces',
        key: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    },
     'productId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      },
    
    
    ),
  down: () => {},
};
