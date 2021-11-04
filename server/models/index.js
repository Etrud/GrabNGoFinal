const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../src/config/config')
const db = {}


//establish database connection
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

//creates model for each file in models folder
fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
   )
   .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
       db[model.name] = model
   })

//Assigns assocations in model page
  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })


db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
