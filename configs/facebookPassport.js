const Users = require('../Models/Users')
const FacebookStrategy = require('passport-facebook').Strategy

const facebookStrategy = new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['displayName', 'email', 'birthday'],
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const id = profile?.id
    const email = profile?.emails?.[0]?.value


    if (!id) {
      return done(null, false, 'เกิดปัญหาระหว่างการรับรองความถูกต้อง')
    }

    if (!email) {
      return done(null, false, 'โปรดให้สิทธิ์การเข้าถึงอีเมลของคุณผ่านทาง Facebook')
    }

    await Users.findOneAndUpdate({ email }, { $set: { 'oauth.facebook': id } }, { new: true })

    const existingUser = await Users.findOne({ ['oauth.facebook']: id })

    if (req.user) {
      if (existingUser) {
        return done(null, false, 'บัญชีนี้เชื่อมโยงกับบัญชีอื่นแล้ว')
      }
      req.user.oauth.facebook = id
      await req.user.save()
      return done(null, req.user)
    }

    if (existingUser) {
      return done(null, existingUser)
    }

    const newUser = await Users.create({
      email,
      username: profile.displayName,
      oauth: {
        facebook: id,
      },
      birthday: profile._json?.birthday,
    });

    return done(null, newUser)
  } catch (error) {
    console.error('ข้อผิดพลาดในการรับรองความถูกต้องของ Facebook:', error)
    return done(error)
  }
})

module.exports = facebookStrategy
