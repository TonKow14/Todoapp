const IsDones = require('../../Models/IsDones');
const Lists = require('../../Models/Lists');

// Route to handle the list status update
module.exports = async (req, res) => {
  const { listId } = req.params;

  try {
    const list = await Lists.findOne({ _id: listId })

    if (!list) {
      return res.status(404).redirect('back')
    }
    const isDone = await IsDones.findOne({listId})

    if (isDone) {
      await isDone.deleteOne({ listId })
      await list.updateOne({ isDoneId: null })
      return res.redirect('back')
    }
    const newIsDone = await IsDones.create({ listId })
    await list.updateOne({ isDoneId: newIsDone._id })
    res.redirect(`/${list.groupId}`)
  } catch (error) {
    console.error('Error updating list status:', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
