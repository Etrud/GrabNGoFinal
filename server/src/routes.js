const authcontroller = require('../controllers/authcontroller')
const authcontrollerpolicy = require('../policies/authcontrollerpolicy')
const ContactController = require('../controllers/contactcontroller')
const punchcontroller = require('../controllers/punchcontroller')

module.exports = (app) => {
  app.post('/register',
    authcontrollerpolicy.register,
    authcontroller.register)

  app.post('/login',
    authcontroller.login)

  app.get('/users',
    ContactController.index)

  app.get('/users/:userId',
    ContactController.show)

  app.post('/punch',
    punchcontroller.registerPunch)

  app.get('/punch/all',
    punchcontroller.index)

  app.get('/punch/your-punches',
    punchcontroller.show)
}
