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
  async show(req, res) {
    try {
      const punches = await Punch.findAll({
        where: {
          employeeID: req.params.userId
        }
      })
      res.send(punches)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing users'
      })

    }
  },
  async deletePunch(req, res) {
    try {
      const punch = await Punch.findByPk(req.params.punchId).catch(e => {
        console.log(e.message)
     })
     console.log(punch)
      await punch.destroy()
      res.send(null)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during deletion of punch'
      })
    }
  
  },
  //edit punch by pk
  async editPunch(req, res) {
    try {
      const punch = await Punch.findByPk(req.params.punchId)
      await punch.update(req.body)
      res.send(punch)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during editing of punch'
      })
    }

  },
}
