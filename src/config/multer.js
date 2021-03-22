const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { resolve, extname } = require('path');

const randomNumber = () => Math.floor(Math.random() * 10000);

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, resolve(__dirname, '..', '..', 'upload', 'images')),
    filename: (req, file, cb) => cb(null, `${uuidv4()}${randomNumber()}${extname(file.originalname)}`),
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError(`Extensão ${file.mimetype} não é permitida.`));
    }
    return cb(null, true);
  },
};
