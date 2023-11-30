const Groups = require('../../Models/Groups');

// update name group
module.exports = async (req, res) => {
  const groupId = req.params.groupId;
  const newNameGroup = req.body.nameGroup;
  console.log(groupId);
  try {
    const updatedGroup = await Groups.findByIdAndUpdate(
      groupId,
      { name: newNameGroup },
      { new: true }
    );

    if (!updatedGroup) {
      return res.send('List not found');
    }

    res.redirect('back');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/error-page');
  }
};
