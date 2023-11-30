const Lists = require('../../Models/Lists');

// Route to handle the list status update
module.exports = async (req, res) => {
  const { listId } = req.params;

  try {
    // Find the list by ID
    const list = await Lists.findById(listId);

    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Toggle the isDone field
    list.isDone = !list.isDone;

    // Save the updated list
    await list.save();

    res.redirect('back')
  } catch (error) {
    console.error('Error updating list status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
