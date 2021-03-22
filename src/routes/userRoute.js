const express = require('express');

const route = express.Router();
const UserController = require('../controller/UserController');
const UserModel = require('../models/User');
const Pagination = require('../middlewares/pagination');
const Auth = require('../middlewares/loginRequired');

route.get('/all', Auth.init(), Pagination.createPagination(UserModel), UserController.index);
route.get('/:id', Auth.init(), UserController.show);
route.post('/', UserController.store);
route.put('/:id', Auth.init(), UserController.update);
route.delete('/:id', Auth.init(),  UserController.delete);

module.exports = route;
