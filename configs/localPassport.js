const Users = require('../Models/Users')

const LocalStrategy = require('passport-local').Strategy

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true
},
async (email, password, done) => {
  try {
    const user = await Users.findOne({ email })
    if (!user) {
      throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }
    await user.comparePassword(password)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

module.exports = localStrategy
