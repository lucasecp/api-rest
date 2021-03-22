const User = require('../models/User');
const Photo = require('../models/PhotoUser');

class UserController {
  async index(req, res) {
    try {
      const users = res.result || await User.findAll({
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });
      res.json(users);
    } catch (erro) {
      res.status(400).json(null);
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

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });
      if (!user) return res.status(400).json({ error: 'Usuário não existe.' });
      res.json(user);
    } catch (err) {
      console.log(err);
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
module.exports = new UserController();
