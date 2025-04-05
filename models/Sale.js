const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./Products');
const Client = require('./Client');

const Sale = sequelize.define('Sale', {
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total: { type: DataTypes.FLOAT, allowNull: false },
});

Sale.belongsTo(User);
Sale.belongsTo(Client);

module.exports = Sale;