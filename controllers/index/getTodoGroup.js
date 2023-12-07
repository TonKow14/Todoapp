const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const isValidObjectId = require('mongoose').Types.ObjectId.isValid

module.exports = async (req, res) => {
  const groupId = req.params.groupId
  if (!isValidObjectId(groupId)) {
    req.flash('error', 'Invalid groupId')
    return res.status(404).redirect('/')
  }

  const group = await Groups.findById(groupId)
  if (!group) {
    return res.status(404).send('Group not found')
  }

  let lists = await Lists.find({ groupId: group._id }).populate('groupId')

  // จัดเรียง Array รายการ
  lists.sort((a, b) => {
    // หาก isDoneId เป็นโมฆะ ให้ย้ายไปไว้ด้านหน้า
    if (a.isDoneId === null && b.isDoneId !== null) {
      return -1
    } else if (a.isDoneId !== null && b.isDoneId === null) {
      return 1
    }

    // จัดเรียงตาม createAt: -1 สำหรับรายการที่มีค่า isDoneId ที่ไม่ใช่ค่าว่าง
    return b.createdAt - a.createdAt;
  })

  res.render('index/todogroup', { lists, group })
}
