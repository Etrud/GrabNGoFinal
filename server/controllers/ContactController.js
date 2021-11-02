const {User, Punch} = require('../models')


module.exports = {
   async index (req, res) {
      try {
        const users = await User.findAll({
           //include: Punch
        })
        res.send(users)
    }catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing users'
      })

    }
  },
  async show (req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      res.send(user)
  }catch (err) {
    res.status(500).send({
      error: 'An error occured grabbing users'
    })

  }
},

}
