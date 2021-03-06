const authcontroller = require('../controllers/authcontroller')
const authcontrollerpolicy = require('../policies/authcontrollerpolicy')
const ContactController = require('../controllers/contactcontroller')
const punchcontroller = require('../controllers/punchcontroller')
const schedulecontroller = require('../controllers/schedulecontroller')

module.exports = (app) => {
  // auth routes
  app.post('/register',
    authcontrollerpolicy.register,
    authcontroller.register)

  app.post('/login',
    authcontroller.login)

  // schedule routes
  app.post('/schedule',
    schedulecontroller.registerSchedule)

  app.get('/schedule/all',
    schedulecontroller.index)

  app.get('/schedule/:userId',
    schedulecontroller.show)

  app.get('/schedule/next/:userId',
    schedulecontroller.showNext)

  app.post('/schedule/delete/:scheduleId',
    schedulecontroller.deleteSchedule)

  app.post('/schedule/edit/:scheduleId',
    schedulecontroller.editSchedule)

  // user routes
  app.post('/updateprofile',
    authcontroller.updateUser)

  app.get('/users',
    ContactController.index)

  app.get('/users/:userId',
    ContactController.show)

  app.post('/users/edit/:userId',
    ContactController.editUser)

  app.post('/users/delete/:userId',
    ContactController.deleteUser)

  // punch Routes
  app.post('/punch',
    punchcontroller.registerPunch)

  app.get('/punch/all',
    punchcontroller.index)

  app.get('/punch/:userId',
    punchcontroller.show)

  app.get('/punch/last/:userId',
    punchcontroller.showLast)

  app.post('/punch/delete/:punchId',
    punchcontroller.deletePunch)

  app.post('/punch/edit/:punchId',
    punchcontroller.editPunch)
}
