const { Op } = require('sequelize');
const PhotosUser = require('../models/PhotoUser');
const PhotoProduct = require('../models/PhotoProduct');
const Product = require('../models/Product');

class Pagination {
  createPagination(model) {
    return async (req, res, next) => {
      const { limit } = req.query;
      const { page } = req.query;
      const startIndex = (page - 1) * limit;
      const { q } = req.query;
      const isUser = model.name === 'users' ? { model: PhotosUser, attributes: ['url', 'filename'] } : false;
      const isProduct = model.name === 'products' ? { model: PhotoProduct, attributes: ['url', 'filename'] } : false;
      const isCLient = model.name === 'users_ecommerces' ? { model: Product, attributes: ['name', 'price', 'category'], through: { attributes: ['id', 'created_at'] } } : false;
      if ((!limit || !page) && !q) return next();
      if (page <= 0 && !q) return next();

      try {
        res.result = await model.findAll({
          where: this.createQuery(model, q),
          limit: limit || 8,
          offset: startIndex || 0,
          // se o model tiver foreignkey
          include: isUser || isProduct || isCLient,
        });

        const countUser = await model.findAndCountAll();
        res.header('count-data', countUser.count);
        return next();
      } catch (err) {
        console.log(err);
        return res.json(err);
      }
    };
  }

  createQuery(model, q) {
    if(!q) return {}
    if (model.name === 'products') {
      return {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            category: {
              [Op.iLike]: `%${q}%`,
            },
          },
        ],
      };
    }
    if (model.name === 'users') {

      return {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            email: {
              [Op.iLike]: `%${q}%`,
            },
          },
        ],
      };
    }
  }
}
module.exports = new Pagination();
