'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type : DataTypes.STRING,
    },
    complete:{
      allowNull: false,
      type : DataTypes.BOOLEAN,
      defaultValue : false
    } ,
    todoId : {
      allowNull: false,
      type : DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue : Date.now()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue :  Date.now()
    },
  }, {});

  
  TodoItem.associate = function(models) {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo,{
      foreignKey: 'todoId',
      onDelete: 'CASCADE'
    })
  };
  return TodoItem;
};