const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const IsDones = require('../../Models/IsDones')

module.exports = async (req, res) => {
  const { groupId } = req.params

  try {
    // Find and delete the group
    const deletedGroup = await Groups.findByIdAndDelete(groupId)

    if (!deletedGroup) {
      return res.send('Group not found')
    }

    // Find all lists with the corresponding groupId and get their listIds
    const deletedLists = await Lists.find({ groupId: deletedGroup._id })
    const listIds = deletedLists.map(list => list._id);

    // Delete all lists with the corresponding groupId
    await Lists.deleteMany({ groupId: deletedGroup._id })

    // Delete IsDones data related to the listIds
    await IsDones.deleteMany({ listId: { $in: listIds } })

    res.redirect('back')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back'); // Handle error redirection
  }
}
