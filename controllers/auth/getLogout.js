module.exports = (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err)
    }
    req.flash('success', 'ล็อกเอาท์สำเร็จ')
    res.redirect('/auth/login')
  })
}
