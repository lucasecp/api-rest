const User = require('../models/UserEcommerce');

class UserEcommerceController {
  async index(req, res) {
    try {
      const users = res.result || await User.findAll();
      res.json(users);
    } catch (erro) {
      res.json(null);
    }
  }

  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) return res.status(400).json({ error: 'Erro na requisição' });
      const userExists = await User.findOne({ where: { email: req.body.email } });
      if (userExists) return res.status(400).json({ error: 'Usuário já existe.' });
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json({
        error: err.errors.map((er) => er.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(400).json({ error: 'Usuário não existe.' });
      const updatedUser = await user.update(req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(400).json({ error: 'Usuário não existe.' });
      res.json(user);
    } catch (err) {
      res.json(null);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(400).json({ error: 'Usuário não existe.' });
      await user.destroy();
      res.json({ msg: 'success' });
    } catch (err) {
      res.status(400).json({
        error: 'Erro ao deletar',
      });
    }
  }
}
module.exports = new UserEcommerceController();
