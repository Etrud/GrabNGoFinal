//Define Schedule Table
//11.3.21
//Brandon Shaffer

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    employeeID: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    start: {
      type: DataTypes.DATE
    },
    end: {
      type: DataTypes.DATE
    },
    color: {
      type: DataTypes.STRING,
    },
  })

  //Associations
  Schedule.associate = function (models) {
    Schedule.belongsTo(models.User, { foreignKey: 'employeeID' })
  }

  return Schedule
}