const Lists = require('../../Models/Lists')

module.exports = async (req, res) => {
  const listId = req.params.listId
  const newText = req.body.text

  try {
    // อัพเดตฐานข้อมูลด้วยข้อความใหม่
    const updatedList = await Lists.findByIdAndUpdate(
      listId,
      { body: newText },
      { new: true }
    )

    if (!updatedList) {
      return res.redirect('back')
    }

    res.redirect('back')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
