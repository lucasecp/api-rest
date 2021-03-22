const multer = require('multer');
const multerConf = require('../config/multer');
const UserPhoto = require('../models/PhotoUser');

const upload = multer(multerConf).single('image');

class Photo {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.code });
      try {
        const { userId } = req.body;
        const { originalname, filename } = req.file;
        const photo = await UserPhoto.create({ originalname, filename, userId });
        if (!photo) return res.status(404).json({ error: 'Dados inválidos.' });
        return res.json(photo);
      } catch (e) {
        return res.status(404).json({ error: 'Dados inválido.' });
      }
    });
  }
}
module.exports = new Photo();
