const express = require('express');

const route = express.Router();
const Product = require('../controller/ProductController');
const ProductModel = require('../models/Product');
const Pagination = require('../middlewares/pagination');
const Auth = require('../middlewares/loginRequired');

route.get('/all', Pagination.createPagination(ProductModel), Product.index);
route.get('/:id', Product.show);
route.post('/', Product.store);
route.put('/:id', Auth.init(), Product.update);
route.delete('/:id', Auth.init(), Product.delete);

module.exports = route;
