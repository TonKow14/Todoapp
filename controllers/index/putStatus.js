module.exports = async (req, res) => {
  const Lists = require('../../Models/Lists');
  const listId = req.params.listId

  try {
    const updatedList = await Lists.findByIdAndUpdate(
      listId,
      { isDone: true },
      { new: true }
    );

    if (!updatedList) {
      return res.send('List not found');
    }

    res.redirect('back');
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/error-page'); // Handle error redirection
  }
}
