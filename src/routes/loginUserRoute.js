const express = require('express');

const route = express.Router();
const LoginController = require('../controller/LoginController');
const UserModel = require('../models/User');

route.post('/', LoginController.init(UserModel));

module.exports = route;
