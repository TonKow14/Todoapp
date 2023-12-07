const router = require('express').Router()
const userOnly = require('../middlewares/userOnly')

router.use(userOnly)

router.get('/:username', require('../controllers/profile/getProfile'))
router.put('/edit', require('../controllers/profile/updateProfile'))

module.exports = router
