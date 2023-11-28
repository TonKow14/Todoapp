const Users = require('../../Models/Users')

module.exports = async (req, res) => {
  const userExist = await Users.exists({ email: req.body.email })
  if (userExist) {
    return res.status(400).json({ message: 'อีเมลนี้มีผู้ใช้งานแล้ว' })
  }
  const user = await Users.create(req.body)
  req.flash('success', `สมัครสมาชิกเรียบร้อยกรุณายืนยันตัวตนผ่านทางอีเมล ${user.email}`)
  res.redirect('/auth/login')
}
