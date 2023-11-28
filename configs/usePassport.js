const passport = require('passport')
const localPassport = require('./localPassport')
const Users = require('../Models/Users')

passport.use(localPassport)

function fiedsInfoUser(user) {
  return {
    _id: user._id,
    username: user.username,
    avatarUrl: user.avatarUrl
  }
}

// Save user id to session
passport.serializeUser((user, done) => {
  const fiedsUser = fiedsInfoUser(user)
  return done(null, fiedsUser)
})

// Retrieve user from session using user id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id)
    const fiedsUser = fiedsInfoUser(user)
    return done(null, fiedsUser)
  } catch (error) {
    return done(error)
  }
})

module.exports = passport
