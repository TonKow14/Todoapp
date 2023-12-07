const Users = require('../Models/Users');

const GoogleStrategy = require('passport-google-oauth20').Strategy

const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email'],
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const id = profile?.id
    const email = profile?.emails?.[0]?.value

    if (!id) {
      return done(null, false, 'เกิดปัญหาระหว่างการรับรองความถูกต้อง')
    }

    if (!email) {
      return done(null, false, 'โปรดให้สิทธิ์การเข้าถึงอีเมลของคุณผ่านทาง Google')
    }

    await Users.findOneAndUpdate({ email }, { $set: { 'oauth.google': id } }, { new: true })


    const existingUser = await Users.findOne({ ['oauth.google']: id })

    if (req.user) {
      if (existingUser) {
        return done(null, false, 'บัญชีนี้เชื่อมโยงกับบัญชีอื่นแล้ว')
      }
      req.user.oauth.google = id
      await req.user.save()
      return done(null, req.user)
    }

    if (existingUser) {
      req.flash('error', 'บัญชีนี้เชื่อมโยงกับบัญชีอื่นแล้ว')
      return done(null, existingUser);
    }

    const newUser = await Users.create({
      email,
      username: profile.displayName,
      oauth: {
        google: id,
      },
    });

    return done(null, newUser)
  } catch (error) {
    console.error('ข้อผิดพลาดในการรับรองความถูกต้องของ Google:', error)
    return done(error)
  }
})

module.exports = googleStrategy
