const Groups = require('../../Models/Groups');
const Lists = require('../../Models/Lists')
const isValidObjectId = require('mongoose').Types.ObjectId.isValid;

module.exports = async (req, res) => {
  const groupId = req.params.groupId;
  if (!isValidObjectId(groupId)) {
    req.flash('error', 'Invalid groupId');
    return res.status(404).redirect('/');
  }

  const group = await Groups.findById(groupId);
  if (!group) {
    return res.status(404).send('Group not found');
  }

  let lists = await Lists.find({ groupId: group._id }).populate('groupId');

  // Sort the lists array
  lists.sort((a, b) => {
    // If isDoneId is null, move it to the front
    if (a.isDoneId === null && b.isDoneId !== null) {
      return -1
    } else if (a.isDoneId !== null && b.isDoneId === null) {
      return 1
    }

    // Sort by createdAt: -1 for items with non-null isDoneId
    return b.createdAt - a.createdAt;
  });

  res.render('index/todogroup', { lists, group });
}
