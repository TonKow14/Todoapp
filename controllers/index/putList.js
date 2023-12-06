const Lists = require('../../Models/Lists');

module.exports = async (req, res) => {
  const listId = req.params.listId;
  const newText = req.body.text;

  try {
    // Update the database with the new text
    // Assuming you have a model called Lists and use Mongoose
    const updatedList = await Lists.findByIdAndUpdate(
      listId,
      { body: newText },
      { new: true }
    );

    if (!updatedList) {
      // Handle case where the list with the given ID is not found
      return res.send('List not found');
    }

    res.redirect('back');
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/back'); // Handle error redirection
  }
}
