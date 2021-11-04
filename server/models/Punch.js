//Define Punch Table
//11.3.21
//Brandon Shaffer

module.exports = (sequelize, DataTypes) => {
  const Punch = sequelize.define('Punch',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      }, 
    employeeID: {
        type: DataTypes.INTEGER,
      },
      punchTime : {
        type: DataTypes.DATE
      },
      punchMessage : {
        type: DataTypes.BOOLEAN
      },
  })

  //Associations
  Punch.associate = function (models){
    Punch.belongsTo(models.User, {foreignKey: 'employeeID'})
  }

  
  return Punch 
}