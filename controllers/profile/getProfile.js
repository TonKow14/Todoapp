const Users = require('../../Models/Users')

module.exports = async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password -createdAt -updatedAt -__v')
  res.render('profile/indexProfile', { auth: req.user, user })
}
