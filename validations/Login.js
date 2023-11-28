const Joi = require('joi')
const validateSchema = require('./validateSchema')

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'กรุณากรอกอีเมล',
      'string.email': 'กรุณากรอกอีเมลให้ถูกต้อง',
    }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'string.empty': 'กรุณากรอกรหัสผ่าน',
      'string.min': 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
    })
})

module.exports = validateSchema(schema)
