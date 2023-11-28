const Joi = require('joi')
const validateSchema = require('./validateSchema')

const schema = Joi.object({
  username: Joi.strung()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .message({
      'string.empty': 'กรุณากรอกชื่อผู้ใช้งาน',
      'string.min': 'ชื่อผู้ใช้งานต้องมีอย่างน้อย 3 ตัวอักษร',
      'string.max': 'ชื่อผู้ใช้งานต้องมีไม่เกิน 30 ตัวอักษร',
      'string.alphanum': 'ชื่อผู้ใช้งานต้องเป็นตัวอักษรหรือตัวเลขเท่านั้น',
    }),
  email: Joi.string()
    .email()
    .required()
    .message({
      'string.empty': 'กรุณากรอกอีเมล',
      'string.email': 'กรุณากรอกอีเมลให้ถูกต้อง',
    }),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .required()
    .message({
      'string.empty': 'กรุณากรอกรหัสผ่าน',
      'string.pattern.base': 'รหัสผ่านต้องมีอย่างน้อย 3 ตัวอักษร',
      'string.min': 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
    }),
  passwordRp: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .message({
      'any.only': 'รหัสผ่านไม่ตรงกัน',
      'string.empty': 'กรุณากรอกรหัสผ่าน',
    })
})

module.exports = validateSchema(schema)
