const express = require('express');

const route = express.Router();
const PhotoController = require('../controller/PhotoProduct');
const Auth = require('../middlewares/loginRequired');

route.post('/', Auth.init(), PhotoController.store);

module.exports = route;
