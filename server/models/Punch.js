module.exports = (sequelize, DataTypes) =>
  sequelize.define('Punch',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      }, 
    employeeID: {
        type: DataTypes.INTEGER,
        references: {         // Employee belongsTo Company 1:1
          model: "Users",
          key: "id"
        }
      },
      punchTime : {
        type: DataTypes.DATE
      },
      punchMessage : {
        type: DataTypes.BOOLEAN
      },
  }) 