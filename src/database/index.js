const Sequelize = require('sequelize');

const UserEcommerce = require('../models/UserEcommerce');
const User = require('../models/User');
const PhotoUser = require('../models/PhotoUser');
const PhotoProduct = require('../models/PhotoProduct');
const Product = require('../models/Product');
const databaseConfig = require('../config/database');

const models = [UserEcommerce, User, PhotoUser, Product, PhotoProduct];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}
module.exports = new Database();
