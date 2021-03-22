const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultvalue: '',
        validate: {
          len: {
            args: [0, 255],
            msg: 'Nome obrigatório.',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        notNull: {
          msg: 'Descrição do produto obrigatória.',
        },
      },
      price: {
        type: Sequelize.DECIMAL(15, 2),
        validate: {
          isDecimal: {
            msg: 'Preço inválido.',
          },
        },
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultvalue: '',
        validate: {
          isInt: {
            msg: 'Número inválido(ESTOQUE).',
          },
        },
      },
      category: {
        type: Sequelize.STRING,
        defaultvalue: '',
      },
      sold: {
        type: Sequelize.INTEGER,
        defaultvalue: 0,

      },

    }, { sequelize, modelName: 'products' });
    return this;
  }

  static associate(models) {
    this.hasMany(models.product_photos, { foreignKey: 'productId' });
    this.belongsToMany(models.users_ecommerces, {
      through: 'order_products_users',
      foreignKey: 'productId',
    });
  }
}
module.exports = Product;
