const { Schema, model } = require('mongoose')

const schema = new Schema({
  body: {
    type: String,
    required: true
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'Groups',
    required: true
  },
  isDoneId: {
    type: Schema.Types.ObjectId,
    ref: 'IsDone',
    default: null
  },
}, { timestamps: true })

module.exports = model('Lists', schema)
