const Sequelize = require('sequelize');
const app = require('../config/app');

class PhotoProduct extends Sequelize.Model {
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
    }, { sequelize, modelName: 'product_photos' });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.products, { foreignKey: 'productId' });
  }
}
module.exports = PhotoProduct;
