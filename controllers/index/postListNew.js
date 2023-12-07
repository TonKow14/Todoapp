const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = async (req, res) => {
  const { groupId } = req.params

  const { text } = req.body
  try {
    const group = await Groups.findOne({ _id: new ObjectId(groupId) })
    if (!group) {
      req.flash('error', 'Group not found')
      return res.status(404).redirect('back')
    }

    // สร้างรายการใหม่ด้วยรหัสของกลุ่มที่พบ
    const newList = new Lists({ body: text, groupId: group._id })
    await newList.save()

    return res.redirect(`/${group._id}`)
  } catch (error) {
    console.error(error)
    return res.status(500).redirect('/')
  }
}
