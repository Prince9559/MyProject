// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(200), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(200), allowNull: false }, // hashed
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
