// models/user.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name cannot be empty' },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters',
      },
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'unique_email',
      msg: 'Email already exists',
    },
    validate: {
      isEmail: { msg: 'Must be a valid email address' },
      notEmpty: { msg: 'Email is required' },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 100],
        msg: 'Password must be at least 6 characters long',
      },
    },
  },

  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
    allowNull: false,
  },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

module.exports = User;
