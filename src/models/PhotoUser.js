const Sequelize = require('sequelize');
const app = require('../config/app');

class PhotoUser extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${app.url}/images/${this.getDataValue('filename')}`;
        },
      },
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      filename: {
        type: Sequelize.STRING,
        defaultvalue: '',
      },
    }, { sequelize, modelName: 'user_photos' });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.users, { foreignKey: 'userId' });
  }
}
module.exports = PhotoUser;
