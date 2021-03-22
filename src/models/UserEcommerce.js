const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');

class Users_ecommerce extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      full_name: {
        type: Sequelize.STRING,
        defaultvalue: '',
        validate: {
          len: {
            args: [0, 255],
            msg: 'Nome completo obrigatório.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultvalue: '',
        unique: {
          msg: 'E-mail já cadastrado.',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido.',
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        defaultvalue: '',
      },
      virtual_password: {
        type: Sequelize.VIRTUAL,
        defaultvalue: '',
        validate: {
          len: {
            args: [8, 255],
            msg: 'Senha deve ter no mínimo 8 caracteres.',
          },
        },
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        defaultvalue: '',
        validate: {
          isDate: {
            msg: 'data de nascimento inválida.',
          },
        },
      },
    }, { sequelize, modelName: 'users_ecommerces' });
    this.addHook('beforeSave', async (user) => {
      if (user.virtual_password) {
        user.password = await bcryptjs.hash(user.virtual_password, 10);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.products, {
      through: 'order_products_users',
      foreignKey: 'userId',
    });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password);
  }
}
module.exports = Users_ecommerce;
