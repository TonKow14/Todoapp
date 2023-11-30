const Users = require('../../Models/Users')

module.exports = async (req, res) => {
  const userExist = await Users.exists({ email: req.body.email })
  if (userExist) {
    req.flash('error', 'อีเมลนี้มีผู้ใช้งานแล้ว')
    return res.status(400).redirect('/auth/register')
  }
  const user = await Users.create(req.body)
  req.flash('success', `สมัครสมาชิกเรียบร้อยกรุณายืนยันตัวตนผ่านทางอีเมล ${user.email}`)
  res.redirect('/auth/login')
}
