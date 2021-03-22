const jwt = require('jsonwebtoken');
require('dotenv').config();
const PhotosUser = require('../models/PhotoUser');

class Login {
  init(model) {
    return async (req, res) => {
      if (!Object.keys(req.body).length) return res.status(400).json({ error: 'Erro na requisição' });

      const { email } = req.body;
      try {
        let user = await model.findOne({ where: { email },});

        if (model.name === 'users') {
         user = await model.findOne({
            where: { email },
            include: { model: PhotosUser, attributes: ['url', 'filename'] },
          });
        }

        if (!user) return res.status(400).json({ message: 'Usuário não existe.' });

        const password = req.body.password || req.body.virtual_password;

        if (!(await user.passwordIsValid(password))) return res.status(400).json({ message: 'Senha inválida.' });

        const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRATION,
        });
        return res.json({ token, user });
      } catch (e) {
        res.status(400).json({ message: 'Credenciais inválidas' });
      }
    };
  }
}
module.exports = new Login();
