const passport = require('passport')

module.exports = (strategyName) => (req, res, next) => {
  passport.authenticate(strategyName, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('error', info)
      return res.redirect(req.user ? '/' : '/login')
    }
    if (req.user) {
      req.flash('success', 'คุณได้ผูกบัญชีแล้ว')
      return res.redirect('/')
    }
    req.login(user, (err) => {
      if (err) {
        return next(err)
      }
      req.flash('success', 'คุณได้เข้าสู่ระบบ')
      res.redirect('/')
    })
  })(req, res, next)
}
