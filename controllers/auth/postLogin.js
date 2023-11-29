const passport = require('../../configs/usePassport');
const validateLogin = require('../../validations/Login')

module.exports = [
  validateLogin,
   (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        req.flash('error', err.message)
        return res.redirect('/auth/login')
      }
      if (!user) {
        req.flash('error', info.message)
        return res.redirect('/auth/login')
      }
      req.login(user, (err) => {
        if (err) return next(err)
        return res.redirect('/')
      })
    })(req, res, next)
  }
]
