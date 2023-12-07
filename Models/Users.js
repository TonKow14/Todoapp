
const bcrypt = require('bcrypt')
const { Schema, model} = require('mongoose')

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  avatarUrl: {
    type: String,
    get(url) {
      if (!url) {
        return 'https://via.placeholder.com/150x150'
      }
      return url
    }
  },
  username: {
    type: String,
  },
  gender: {
    type: String,
    group: ['Male', 'Female', 'Other', 'None'],
    default: 'None'
  },
  birthdate: {
    type: Date,
  },
  oauth: {
    facebook: String,
    google: String
  }
},{ timestamps: true })


// brcypt Password
const perSetPassword = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS)
  }
  next()
}

schema.pre('save', perSetPassword)
schema.pre('updateOne', perSetPassword)

schema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  if(!result) {
    throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
  }
  return result
}

module.exports = model('User', schema)
