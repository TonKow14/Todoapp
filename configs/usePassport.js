const passport = require('passport')
// const localPassport = require('./localPassport')
const Users = require('../Models/Users')
const LocalStrategy = require('passport-local').Strategy

// passport.use(localPassport)
passport.use(new LocalStrategy({
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
}))

function fiedsInfoUser(user) {
  return {
    _id: user._id,
    username: user.username,
    avatarUrl: user.avatarUrl,
    birthdate: user.birthdate,
  }
}

// Save user id to session
passport.serializeUser((user, done) => {
  const fiedsUser = fiedsInfoUser(user)
  return done(null, user)
})

// Retrieve user from session using user id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id)
    const fiedsUser = fiedsInfoUser(user)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

module.exports = passport
