const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const { DateTime } = require('luxon')

module.exports = async (req, res) => {
  const groupId = req.params.groupId
  const { text } = req.body

  let group = await Groups.findOne({ name: groupId })

  // ตรวจสอบว่ามีกลุ่มอยู่หรือไม่ ถ้าไม่มี ให้สร้างกลุ่มใหม่
  if (!group) {
    const formatTime = DateTime.now().toFormat('dd-MM-yyyy HH:mm:ss')
    group = new Groups({ name: `New Group_${formatTime}`, userId: req.user._id })
    await group.save()
    const newList = new Lists({ body: text, groupId: group._id })
    await newList.save()
    return res.redirect(`/${group._id}`)
  }
}
