const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserEcommerceModel = require('../models/UserEcommerce');
const UserModel = require('../models/User');

class Auth {
  init() {
    return async (req, res, next) => {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ errors: 'Usuário não logado.' });
      const token = authorization.split(' ')[1];

      try {
        const verfy = jwt.verify(token, process.env.TOKEN_SECRET);
        const { email } = verfy;
        const userEcommerce = await UserEcommerceModel.findOne({ where: { email } });
        const user = await UserModel.findOne({ where: { email } });
        if (!user && !userEcommerce) return res.status(404).json({ error: 'Usuário inválido' });
        return next();
      } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
      }
    };
  }
}
module.exports = new Auth();
