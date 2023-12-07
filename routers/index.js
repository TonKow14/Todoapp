const router = require('express').Router()
const userOnly = require('../middlewares/userOnly')

router.get('/', userOnly, require('../controllers/index/getindex'))
// group ทั้งหมด
router.get('/allGroups', userOnly,  require('../controllers/index/getAllGroups'))

// เพิ่ม group ใหม่
router.post('/todos', userOnly,  require('../controllers/index/postList'))
// ไปยังหน้าแสดง list ใน group ที่เลือก
router.get('/:groupId', userOnly,  require('../controllers/index/getTodoGroup'))
// เพิ่ม list ใน group ที่เลือก
router.post('/todos/:groupId', userOnly,  require('../controllers/index/postListNew'))

// แก้ไข name group ที่เลือก
router.put('/edit-group/:groupId', userOnly,  require('../controllers/index/putNameGroup'))
// แก้ไข list ใน group ที่เลือก
router.put('/todos/:listId', userOnly,  require('../controllers/index/putList'))
// แก้ไข status list ใน group ที่เลือก
router.get('/update-list/status/:listId', userOnly,  require('../controllers/index/putStatus'))

// ลบ group ที่เลือก
router.delete('/delete-group/:groupId', userOnly,  require('../controllers/index/deleteGroup'))
// ลบ list ใน group ที่เลือก
router.delete('/todos/:listId', userOnly,  require('../controllers/index/deleteList'))


module.exports = router
