const router = require('express').Router()
const  guestOnly = require('../middlewares/guestOnly')
const authOnly = require('../middlewares/authOnly')


router.get('/login', guestOnly, require('../controllers/auth/getLogin'))
router.get('/register', guestOnly, require('../controllers/auth/getRegister'))

router.post('/register', guestOnly, require('../controllers/auth/postRegister'))
router.post('/login', guestOnly, require('../controllers/auth/postLogin'))

router.get('/logout', authOnly, require('../controllers/auth/getLogout'))

module.exports = router
