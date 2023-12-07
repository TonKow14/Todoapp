module.exports = async (req, res) => {
  res.render('profile/indexProfile', { auth: req.user })
}
