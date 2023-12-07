const Users = require('../../Models/Users')

module.exports = async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password -createdAt -updatedAt -__v')
  if(user.oauth.facebook){
    user.oauth.facebook = null
    await user.save()
  }
  req.flash('success', 'ยกเลิกการเชื่อมบัญชี Facebook สำเร็จ')
  res.redirect(`/profile/${req.user.username}`)
}
