const sequelize = require('../database');
const User = require('./User');
const Product = require('./Products');
const Client = require('./Client');
const Sale = require('./Sale');
const SaleDetail = require('./SaleDetail');

sequelize.sync({ force: false }).then(() => console.log('DB sincronizada'));

module.exports = { User, Product, Client, Sale, SaleDetail };
