const passport = require('passport')
const localPassport = require('./localPassport')
const facebookStrategy = require('./facebookPassport')
const Users = require('../Models/Users')
const googleStrategy = require('./googlePassport')

passport.use(localPassport)
passport.use(facebookStrategy)
passport.use(googleStrategy)


// Save user id to session
passport.serializeUser((user, done) => {
  return done(null, user._id)
})

// ดึงข้อมูลผู้ใช้จากเซสชันโดยใช้รหัสผู้ใช้
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id).select('-password -createdAt -updatedAt -__v -oauth')
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

module.exports = passport
