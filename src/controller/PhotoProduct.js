const multer = require('multer');
const multerConf = require('../config/multer');
const ProductPhoto = require('../models/PhotoProduct');

const upload = multer(multerConf).single('image');

class Photo {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.code });
      try {
        const { product } = req.body;
        const { originalname, filename } = req.file;
        const photo = await ProductPhoto.create({ originalname, filename, productId: product });

        if (!photo) return res.status(400).json({ error: 'Dados inválidos' });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({ error: 'Dados inválidos'});
      }
    });
  }
}
module.exports = new Photo();
