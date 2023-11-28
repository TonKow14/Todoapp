const Lists = require('../../Models/Lists')

module.exports = async (req, res) => {
  const lists = await Lists.find().populate('groupId').sort({ createdAt: -1 })
  // const group = await Groups.find({  })
  console.log(lists)
  res.render('index/index', {lists})
}
