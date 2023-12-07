const passport = require('passport')
const router = require('express').Router()
const postLogin = require('../controllers/auth/postLogin')
const guestOnly = require('../middlewares/guestOnly')


router.get('/login', guestOnly,  require('../controllers/auth/getLogin'))
router.get('/register', guestOnly,  require('../controllers/auth/getRegister'))

// local Passport
router.post('/register', guestOnly, require('../controllers/auth/postRegister'))
router.post('/login', guestOnly,  postLogin('local'))

// facebook Passport
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback', postLogin('facebook'))

// google Passport
router.get('/google', passport.authenticate('google'))
router.get('/google/callback' , postLogin('google'))

// unlink account
router.put('/facebook/unlink', require('../controllers/auth/putFacebookUnlink'))
router.put('/google/unlink', require('../controllers/auth/putGoogleUnlink'))

router.get('/logout', require('../controllers/auth/getLogout'))

module.exports = router
