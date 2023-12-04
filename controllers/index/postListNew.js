const Groups = require('../../Models/Groups')
const Lists = require('../../Models/Lists')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = async (req, res) => {
  const { groupId } = req.params

  const { text } = req.body
  console.log()
  try {
    // Find the group based on the name
    const group = await Groups.findOne({ _id: new ObjectId(groupId) });
    if (!group) {
      // If the group doesn't exist, you may want to handle this case accordingly
      console.error(`Group '${groupId}' not found`);
      return res.status(404).redirect('back');
    }

    // Create a new list with the found group's ID
    const newList = new Lists({ body: text, groupId: group._id });
    await newList.save();

    // Redirect to the group's path
    return res.redirect(`/${group._id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
