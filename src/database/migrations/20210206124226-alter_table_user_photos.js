module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('user_photos',
    'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }),
  down: () => {},
};
