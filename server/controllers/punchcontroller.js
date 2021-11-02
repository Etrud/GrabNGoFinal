const { Punch } = require('../models')

module.exports = {
  async registerPunch(req, res) {
    try {
      const punch = await Punch.create(req.body)
      res.send(punch.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'error creating punch'
      })
    }
  },
  async index(req, res) {
    try {
      const punchs = await Punch.findAll({
        attributes: ['id', 'employeeID', 'punchTime', 'punchMessage'],

      })
      res.send(punchs)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing punches'
      })

    }
  },
  async show(req, res) {
    try {
      const {employeeID} = req.body
      const punches = await Punch.findAll({
        where: {
          employeeID: employeeID
        } 
      })
      res.send(punches)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing punches for user'
      })

    }
  },
}
