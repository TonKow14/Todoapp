const { Schema, model} = require('mongoose')

const schema = new Schema({
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'Lists',
    required: true
  },
}, { timestamps: true })

module.exports = model('IsDone', schema)
