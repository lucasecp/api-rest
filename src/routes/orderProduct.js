const express = require('express');

const route = express.Router();
const OrderController = require('../controller/OrderController');
const Pagination = require('../middlewares/pagination');
const UserModel = require('../models/UserEcommerce');
const Auth = require('../middlewares/loginRequired');

route.get('/all',Auth.init(), Pagination.createPagination(UserModel), OrderController.index);
route.get('/:id',Auth.init(), OrderController.show);
route.post('/', Auth.init(), OrderController.store);
// route.get('/:id', OrderController.show);

module.exports = route;
