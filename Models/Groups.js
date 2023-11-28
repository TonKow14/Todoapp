const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
}, { timestamps: true })

module.exports = model('Groups', schema)
