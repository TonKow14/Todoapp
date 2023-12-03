const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')

module.exports = async (req, res) => {
  const isValidObjectId = require('mongoose').Types.ObjectId.isValid; // ตรวจสอบว่าเป็น id ที่ถูกต้องหรือไม่
  const groupId = req.params.groupId
  if (!isValidObjectId(groupId)) {
    req.flash('error', 'Invalid groupId')
    return res.status(404).redirect('/')
  }
  const group = await Groups.findById(groupId)
  if (!group) {
    // Handle the case where the group is not found
    return res.status(404).send('Group not found');
  }
  const lists = await Lists.find({ groupId: group._id }).populate('groupId').sort({ createdAt: -1 })
  res.render('index/todogroup', { lists, group })
}
