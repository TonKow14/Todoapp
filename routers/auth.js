const router = require('express').Router()
const  guestOnly = require('../middlewares/guestOnly')
const authOnly = require('../middlewares/authOnly')


router.get('/login',  require('../controllers/auth/getLogin'))
router.get('/register',  require('../controllers/auth/getRegister'))

router.post('/register', require('../controllers/auth/postRegister'))
router.post('/login',  require('../controllers/auth/postLogin'))

router.get('/logout', require('../controllers/auth/getLogout'))

module.exports = router
