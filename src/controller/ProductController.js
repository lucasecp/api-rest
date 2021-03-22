const Product = require('../models/Product');
const PhotoProduct = require('../models/PhotoProduct');

class ProductController {
  async index(req, res) {
    try {
      const product = res.result || await Product.findAll({
        include: {
          model: PhotoProduct,
          attributes: ['url', 'filename'],
        },
      });
      res.json(product);
    } catch (erro) {
      res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: {
          model: PhotoProduct,
          attributes: ['url', 'filename'],
        },
      });
      if (!product) return res.status(400).json({ error: 'Produto não existe.' });
      res.json(product);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async store(req, res) {
    try {
      if (!Object.keys(req.body).length) return res.status(400).json({ error: 'Erro na requisição' });
      const newProduct = await Product.create(req.body);
      res.json(newProduct);
    } catch (err) {
      res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Produto não existe.' });
      const newProduct = await product.update(req.body);
      res.json(newProduct);
    } catch (err) {
      res.status(400).json({
        error: 'Erro ao editar produto.',
      });
    }
  }

  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Produto não existe.' });
      await product.destroy();
      res.json({ msg: 'success' });
    } catch (err) {
      res.status(400).json({
        error: 'Erro ao editar produto.',
      });
    }
  }
}
module.exports = new ProductController();
