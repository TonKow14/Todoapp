module.exports = (schema) => async (req, res, next) => {
  await schema.validateAsync(req.body)
  next()
}
