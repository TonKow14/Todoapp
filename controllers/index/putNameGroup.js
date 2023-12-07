const Groups = require('../../Models/Groups')

// อัพเดตชื่อกลุ่ม
module.exports = async (req, res) => {
  const groupId = req.params.groupId
  const newNameGroup = req.body.nameGroup
  try {
    const updatedGroup = await Groups.findByIdAndUpdate(
      groupId,
      { name: newNameGroup },
      { new: true }
    )

    if (!updatedGroup) {
      return res.send('List not found')
    }

    res.redirect('back')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
