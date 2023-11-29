const Groups = require('../../Models/Groups');
const Lists = require('../../Models/Lists');

module.exports = async (req, res) => {
  const { nameGroup } = req.params;
  const { text } = req.body;
  console.log(nameGroup);
  try {
    // Find the group based on the name
    const group = await Groups.findOne({ name: nameGroup });
    if (!group) {
      // If the group doesn't exist, you may want to handle this case accordingly
      console.error(`Group '${nameGroup}' not found`);
      return res.status(404).send('Group not found');
    }

    // Create a new list with the found group's ID
    const newList = new Lists({ body: text, groupId: group._id });
    await newList.save();

    // Redirect to the group's path
    return res.redirect(`/${group.name}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
