const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const IsDones = require('../../Models/IsDones')

module.exports = async (req, res) => {
  const { groupId } = req.params

  try {
    // ค้นหาและลบกลุ่ม
    const deletedGroup = await Groups.findByIdAndDelete(groupId)

    if (!deletedGroup) {
      return res.send('Group not found')
    }

    // ค้นหารายการทั้งหมดที่มี groupId ที่เกี่ยวข้องและรับ listIds
    const deletedLists = await Lists.find({ groupId: deletedGroup._id })
    const listIds = deletedLists.map(list => list._id)

    // ลบรายการทั้งหมดที่เกี่ยวข้อง
    await Lists.deleteMany({ groupId: deletedGroup._id })
    await IsDones.deleteMany({ listId: { $in: listIds } })

    res.redirect('back')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
