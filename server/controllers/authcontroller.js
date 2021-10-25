module.exports = {
   register (req, res) {
      res.send({
        message: `Welcome ${req.body.email}, your user was registered!`
      })
    }
  }
  