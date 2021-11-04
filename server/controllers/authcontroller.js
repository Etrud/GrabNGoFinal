//Brandon Shaffer

//Controls ContactBook API methods

//constants
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../src/config/config')

//assign JWT for one week
function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  //add user
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  //login user and assign token
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'The login information is incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        res.status(403).send({
          error: 'The login information is incorrect.'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during login'
      })
    }
  },
  //update user (not working)
  async updateUser(req, res) {
    try {
      const { id } = req.body
      const user = await User.findOne({
        where: {
          id: id
        }
      })


      await user.update(req.body)
      res.send(user)

    } catch (err) {
      res.status(500).send({
        error: 'Error has occured during updating of user'
      })
    }
  },
}
