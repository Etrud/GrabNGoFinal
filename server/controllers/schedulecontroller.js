//Brandon Shaffer

//Controls Punch API methods

//constants
const { Schedule, User } = require('../models')

module.exports = {
  //add Schedule
  async registerSchedule(req, res) {
    try {
      const schedule = await Schedule.create(req.body)
      res.send(schedule.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'error creating schedule event'
      })
    }
  },

  //show all punches
  async index(req, res) {
    try {
      const schedules = await Schedule.findAll({
        //attributes: ['id', 'employeeID', 'punchTime', 'punchMessage'],
        include: [{
          model: User
        }]

      })
      res.send(schedules)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing schedules'
      })

    }
  },
  //show punch by id by empID
  async show (req, res) {
    try {
      const punches = await Schedule.findAll({
        where: {
          employeeID: req.params.userId
        }
        })
      res.send(punches)
  }catch (err) {
    res.status(500).send({
      error: 'An error occured grabbing schedule'
    })

  }
},
}
