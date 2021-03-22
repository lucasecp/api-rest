const express = require('express');

const route = express.Router();
const UserController = require('../controller/PhotoUserController');
const Auth = require('../middlewares/loginRequired');

route.post('/', Auth.init(), UserController.store);

module.exports = route;
