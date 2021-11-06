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
  //show schedules by id by empID
  async show(req, res) {
    try {
      const schedules = await Schedule.findAll({
        where: {
          employeeID: req.params.userId
        }
      })
      res.send(schedules)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing schedule'
      })

    }
  },
  //delete schedule by pk
  async deleteSchedule(req, res) {
    try {
      const schedule = await Schedule.findByPk(req.params.scheduleId).catch(e => {
        console.log(e.message)
      })
      console.log(schedule)
      await schedule.destroy()
      res.send(null)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during deletion of schedule'
      })
    }

  },
  //edit schedule by pk
  async editSchedule(req, res) {
    try {
      const schedule = await Schedule.findByPk(req.params.scheduleId)
      await schedule.update(req.body)
      res.send(schedule)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during editing of schedule'
      })
    }

  },
}
