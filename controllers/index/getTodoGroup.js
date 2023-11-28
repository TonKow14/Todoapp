const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')

module.exports = async (req, res) => {
  const { nameGroup } = req.params
  const group = await Groups.findOne({ name: nameGroup })
  const lists = await Lists.find({ groupId: group._id }).populate('groupId').sort({ createdAt: -1 })
  res.render('index/todogroup', { lists, nameGroup })
}
