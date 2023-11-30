const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const { DateTime } = require('luxon')

module.exports = async (req, res) => {
  const { text, groupName } = req.body

  let group = await Groups.findOne({ name: groupName })

  // Check if group exists, if not, create a new one
  if (!group) {
    const formatTime = DateTime.now().toFormat('dd-MM-yyyy HH:mm:ss')
    group = new Groups({ name: `New Group_${formatTime}`, userId: req.user._id })
    await group.save()
    const newList = new Lists({ body: text, groupId: group._id })
    await newList.save()
    return res.redirect(`/${group._id}`)
  }
}
