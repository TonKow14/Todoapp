const router = require('express').Router()

router.get('/:username', require('../controllers/profile/getProfile'))
router.put('/edit', require('../controllers/profile/updateProfile'))

module.exports = router
