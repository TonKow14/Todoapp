const IsDones = require('../../Models/IsDones');
const Lists = require('../../Models/Lists');

// /todos/${list._id}?_method=delete
module.exports = async (req, res) => {
  const listId = req.params.listId

  try {
    const deletedList = await Lists.findByIdAndDelete(listId)
    await IsDones.deleteOne({ listId })

    if (!deletedList && !IsDones ) {
      // Handle case where the list with the given ID is not found
      return res.send('List not found');
    }

    res.redirect('back')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('back')
  }
}
