const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.create = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(500).json({ err: "Empty fields" })
  }
  //Verify if user already existst -PENDING-
  // const user = await User.findOne({
  //   email
  // })
  // if (user) {
  //   return res.status(500).json({ err: "user exists" })
  // }
  const salt = bcrypt.genSaltSync(12)
  const hashPass = bcrypt.hashSync(password, salt)
  await User.create({
    email,
    password: hashPass,
  })
  return res.status(200).json({ message: "success" })
}

exports.login = (req, res) => {
  const { user } = req
  res.status(200).json({ user })
}

exports.logout = (req, res) => {
  req.logout()
  req.session.destroy()
  res.status(200).json({ msg: "Logged out" })
}

exports.profile = (req, res) => {
  User.findOne({
    where: {
      id: req.user.dataValues.id,
    },
  })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }))
}
