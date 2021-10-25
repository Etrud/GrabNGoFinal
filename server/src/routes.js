const authcontroller = require('../controllers/authcontroller')

module.exports = (app) => {
  app.post('/register',
    authcontroller.register)
}
