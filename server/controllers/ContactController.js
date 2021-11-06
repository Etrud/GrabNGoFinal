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
  //delete user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.userId).catch(e => {
        console.log(e.message)
     })
     console.log(user)
      await user.destroy()
      res.send(null)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during deletion of user'
      })
    }
  },
  //edit user by pk
  async editUser(req, res) {
    try {
      const user = await User.findByPk(req.params.userId)
      await user.update(req.body)
      res.send(user)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during editing of user'
      })
    }

  },

}
