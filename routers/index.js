const router = require('express').Router()
const authOnly = require('../middlewares/authOnly')

router.use(authOnly)

router.get('/', require('../controllers/index/getindex'))
// เพิ่ม group ใหม่
router.post('/todos', require('../controllers/index/postList'))
// ไปยังหน้าแสดง list ใน group ที่เลือก
router.get('/:nameGroup', require('../controllers/index/getTodoGroup'))
// เพิ่ม list ใน group ที่เลือก
router.post('/todos/:nameGroup', require('../controllers/index/postListNew'))

module.exports = router
