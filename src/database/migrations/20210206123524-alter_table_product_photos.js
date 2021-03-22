module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('product_photos',
    'productId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),
  down: () => {},
};
