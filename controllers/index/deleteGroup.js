const Groups = require('../../Models/Groups');

module.exports = async (req, res) => {
  const { groupId } = req.params
  try {
    // Delete the list from the database
    // Assuming you have a model called Lists and use Mongoose
    const deletedGroup = await Groups.findByIdAndDelete(groupId)

    if (!deletedGroup) {
      // Handle case where the list with the given ID is not found
      return res.send('List not found');
    }

    res.redirect('back')
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/error-page') // Handle error redirection
  }
}
