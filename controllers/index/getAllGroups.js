const Groups = require('../../Models/Groups')

module.exports = async (req, res) => {
  const groups = await Groups.find({ userId: res.locals.auth._id }).sort({ createdAt: -1 })
  res.render('index/allGroups', { groups })
}
