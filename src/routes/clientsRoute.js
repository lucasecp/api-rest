const express = require('express');

const route = express.Router();
const UserEcommerce = require('../controller/UserEcommerce');
const UserEcommerceModel = require('../models/UserEcommerce');
const Pagination = require('../middlewares/pagination');
const Auth = require('../middlewares/loginRequired');

// middleware(Auth) de autenticação para o usuário da dashboard que vai usar

route.get('/', Auth.init(), Pagination.createPagination(UserEcommerceModel), UserEcommerce.index);
route.get('/:id', Auth.init(), UserEcommerce.show);
route.post('/', UserEcommerce.store);

// middleware(Auth) de autenticação para o usuário da loja que vai usar

route.put('/:id', Auth.init(), UserEcommerce.update);
route.delete('/:id', Auth.init(), UserEcommerce.delete);

module.exports = route;
