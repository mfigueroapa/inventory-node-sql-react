const router = require('express').Router();
const User = require("../models/User")
const passport = require("passport")
const bcrypt = require("bcrypt")

router.post("/signup", async (req, res, next) => {
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
})

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const { user } = req
  res.status(200).json({ user })
})

router.get("/logout", (req, res, next) => {
  req.logout()
  req.session.destroy()
  res.status(200).json({ msg: "Logged out" })
})

router.get("/profile", isAuth, (req, res, next) => {
  User.findOne({
    where: {
      id: req.user.dataValues.id,
    },
  })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }))
})

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: "Log in first" })
}

module.exports = router
