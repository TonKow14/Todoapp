const Joi = require('joi')
const validateSchema = require('./validateSchema')

const schema = Joi.object({
  displayName: Joi.string()
    .max(50)
    .alphanum()
    .required()
    .messages({
      'string.max': 'กรุณาระบุชื่อให้สั้นกว่า 50 อักษร'
    }),
  birthDate: Joi.any(),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other')
})

module.exports = validateSchema(schema)
