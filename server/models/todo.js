'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type : DataTypes.STRING
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

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem,{
      foreignKey:'todoId',
      as : 'todoItems'
    })
  };
  return Todo;
};