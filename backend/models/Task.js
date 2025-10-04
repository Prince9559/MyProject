// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  title: { type: DataTypes.STRING(250), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  tableName: 'tasks',
  timestamps: true
});

module.exports = Task;
