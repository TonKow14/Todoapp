// const authOnly = require('../middlewares/authOnly')

const router = require('express').Router()

// router.use(authOnly)

router.get('/', require('../controllers/index/getindex'))
// group ทั้งหมด
router.get('/allGroups', require('../controllers/index/getAllGroups'))

// เพิ่ม group ใหม่
router.post('/todos', require('../controllers/index/postList'))
// ไปยังหน้าแสดง list ใน group ที่เลือก
router.get('/:groupId', require('../controllers/index/getTodoGroup'))
// เพิ่ม list ใน group ที่เลือก
router.post('/todos/:groupId', require('../controllers/index/postListNew'))

// แก้ไข name group ที่เลือก
router.put('/edit-group/:groupId', require('../controllers/index/putNameGroup'))
// แก้ไข list ใน group ที่เลือก
router.put('/todos/:listId', require('../controllers/index/putList'))
// แก้ไข status list ใน group ที่เลือก
router.get('/update-list/status/:listId', require('../controllers/index/putStatus'))

// ลบ group ที่เลือก
router.delete('/delete-group/:groupId', require('../controllers/index/deleteGroup'))
// ลบ list ใน group ที่เลือก
router.delete('/todos/:listId', require('../controllers/index/deleteList'))


module.exports = router
