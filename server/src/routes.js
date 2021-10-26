const authcontroller = require('../controllers/authcontroller')

const authcontrollerpolicy = require('../policies/authcontrollerpolicy')

module.exports = (app) => {
  app.post('/register',
    authcontrollerpolicy.register,
    authcontroller.register)
}
