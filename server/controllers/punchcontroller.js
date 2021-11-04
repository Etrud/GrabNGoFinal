//Brandon Shaffer

//Controls Punch API methods

//constants
const { Punch, User } = require('../models')

module.exports = {
  //add punch
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
  //show all punches
  async index(req, res) {
    try {
      const punchs = await Punch.findAll({
        attributes: ['id', 'employeeID', 'punchTime', 'punchMessage'],
        include: [{
          model: User
        }]

      })
      res.send(punchs)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing punches'
      })

    }
  },
  //show punch by id by empID
  async show (req, res) {
    try {
      const punches = await Punch.findAll({
        where: {
          employeeID: req.params.userId
        }
        })
      res.send(punches)
  }catch (err) {
    res.status(500).send({
      error: 'An error occured grabbing users'
    })

  }
},
}
