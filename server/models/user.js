'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue : new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue : new Date()
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Todo,{
      foreignKey:'userId',
      as : 'userTodos'
    })
  };
  User.saltRounds = 10;


  User.generateHash = function(plainPassword){
    return bcrypt.hash(plainPassword, User.saltRounds)
  }

  User.isPasswordMatched = function(password, hash){
    return  bcrypt.compare(password, hash)
  }

  return User;
};