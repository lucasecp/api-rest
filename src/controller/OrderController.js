const User = require('../models/UserEcommerce');
const Product = require('../models/Product');

class OrderController {
  // middleware da dashboard
  async index(req, res) {
    try {
      const users = res.result || await User.findAll({
        attributes: ['id', 'email'],
        include: {
          model: Product,
          attributes: ['id','name', 'price','category'],
          through: {
            attributes: ['id', 'created_at'],
          },
        },
      });
       res.json(users);
    } catch (erro) {
       res.json(null);
    }
  }

  // middleware do ecommerce
  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) return res.status(400).json({ error: 'Erro na requisição' });
      const { productId, userId } = req.body;
      const client = await User.findByPk(userId);
      if (!client) return res.status(400).json({ error: 'Usuário não encontrado.' });
     const resp = productId.reduce(async (ac,prod) => {
        if (!(await Product.findByPk(prod))) {
          ac = false;
          return ac;
          }
        client.addProduct(prod)
        return ac
      },true);
      if(!(await resp)) return res.status(400).json({
        error: 'produto não encontrado.'
      });
      return res.status(200).json({msg: 'success'})
    } catch (err) {
      return res.status(400).json({
        error: 'Usuário não encontrado.',
      });
    }
  }

  // middleware do ecommerce
  async show(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Sem informação.' });
    try {
      const order = await User.findOne({
        where: { id },
        attributes: ['id', 'email'],
        include: {
          model: Product,
          attributes: ['name', 'price'],
          through: {
            attributes: ['id'],
          },
        },
      });
      if (!order) return res.status(400).json({ error: 'Usuário não encontrado.' });
      return res.json(order);
    } catch (e) {
      return res.json({ error: 'Usuário não encontrado.' });
    }
  }
}
module.exports = new OrderController();
