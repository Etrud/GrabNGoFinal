//Define User Table
//11.3.21
//Brandon Shaffer

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

//hash password by salt
function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return;
  }
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
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
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isEmployed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
    {
      hooks: {
        beforeSave: hashPassword
      }
    })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  //Associations
  User.associate = function (models) {
    User.hasMany(models.Punch, {
      foreignKey: 'employeeID', onDelete: 'cascade',
      hooks: true,
    })
    User.hasMany(models.Schedule, {
      foreignKey: 'employeeID', onDelete: 'cascade',
      hooks: true,
    })
  }

  return User
}