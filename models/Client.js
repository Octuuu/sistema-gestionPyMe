const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Client = sequelize.define('Client', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  ci_ruc: { type: DataTypes.STRING, allowNull: false, unique: true },
  direccion: { type: DataTypes.STRING },
  telefono: { type: DataTypes.STRING },
});

module.exports = Client;
