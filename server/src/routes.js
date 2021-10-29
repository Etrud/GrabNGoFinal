const authcontroller = require('../controllers/authcontroller')
const authcontrollerpolicy = require('../policies/authcontrollerpolicy')
const ContactController = require('../controllers/contactcontroller')

module.exports = (app) => {
  app.post('/register',
    authcontrollerpolicy.register,
    authcontroller.register)

  app.post('/login',
    authcontroller.login)

  app.get('/users',
    ContactController.index)
}
