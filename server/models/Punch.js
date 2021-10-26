module.exports = (sequelize, DataTypes) =>
  sequelize.define('Punch',{
      employeeID: {
        type: DataTypes.INTEGER
      }
  }) 