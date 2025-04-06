const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sale = require('./Sale');
const Product = require('./Products');

const SaleDetail = sequelize.define('SaleDetail', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  subtotal: { type: DataTypes.FLOAT, allowNull: false },
});

SaleDetail.belongsTo(Sale);
SaleDetail.belongsTo(Product);

module.exports = SaleDetail;
