const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { resolve } = require('path');
const UserEcommerceRoute = require('./src/routes/clientsRoute');
const UserRoute = require('./src/routes/userRoute');
const LoginUser = require('./src/routes/loginUserRoute');
const LoginUserEcommerce = require('./src/routes/loginUserEcommerceRoute');
const PhotoUserRoute = require('./src/routes/photoUserRoute');
const ProductRoute = require('./src/routes/productRoute');
const ProductPhoto = require('./src/routes/photoProductRoute');
const OrderRoute = require('./src/routes/orderProduct');
require('dotenv').config();
require('./src/database');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors({exposedHeaders: 'count-data', origin:'https://dashboard-loja.netlify.app/'}));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(express.static(resolve(__dirname, 'upload')));
  }

  routes() {
    this.app.use('/client', UserEcommerceRoute);
    this.app.use('/user', UserRoute);
    this.app.use('/login/user', LoginUser);
    this.app.use('/login/client', LoginUserEcommerce);
    this.app.use('/photo/user', PhotoUserRoute);
    this.app.use('/product', ProductRoute);
    this.app.use('/photo/product', ProductPhoto);
    this.app.use('/order', OrderRoute);
  }
}
module.exports = new App().app;
