const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Sequelize.Model {
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
      admin: {
        type: Sequelize.BOOLEAN,
        defaultvalue: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultvalue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultvalue: '',
        validate: {
          len: {
            args: [8, 255],
            msg: 'Senha deve ter no mínimo 8 caracteres.',
          },
        },
      },
    }, { sequelize, modelName: 'users' });
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 10);
      }
    });
    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.user_photos, { foreignKey: 'userId' });
  }
}
module.exports = User;
