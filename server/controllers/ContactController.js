//Brandon Shaffer

//Controls ContactBook API methods

//constants
const {User} = require('../models')


module.exports = {
  //show all users
   async index (req, res) {
      try {
        const users = await User.findAll({
        })
        res.send(users)
    }catch (err) {
      res.status(500).send({
        error: 'An error occured grabbing users'
      })

    }
  },
  //show user by empID
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
