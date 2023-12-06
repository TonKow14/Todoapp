const router = require('express').Router()


router.get('/login',  require('../controllers/auth/getLogin'))
router.get('/register',  require('../controllers/auth/getRegister'))

router.post('/register', require('../controllers/auth/postRegister'))
router.post('/login',  require('../controllers/auth/postLogin'))

router.get('/logout', require('../controllers/auth/getLogout'))

module.exports = router
