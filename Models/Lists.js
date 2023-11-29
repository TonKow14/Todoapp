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
  isDone: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = model('Lists', schema)
