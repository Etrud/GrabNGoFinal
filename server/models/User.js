module.exports = (sequelize, DataTypes) =>
  sequelize.define('User',{
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password : {
          type: DataTypes.STRING
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      phonenum: {
        type: DataTypes.STRING
      }
  }) 