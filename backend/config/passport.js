const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const User = require("../models/User")

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({
        where: {
          email: email,
        },
      })
        .then((foundUser) => {
          if (!foundUser) {
            done(null, false, {
              message: "Incorrect username",
            })
            return
          }

          if (!bcrypt.compareSync(password, foundUser.password)) {
            done(null, false, {
              message: "Incorrect password",
            })
            return
          }

          done(null, foundUser)
        })
        .catch((err) => done(err))
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findOne({
    where: {
      id: id,
    },
  }).then(function (user) {
    if (user === null) {
      done(new Error("Wrong user id"))
    }
    done(null, user)
  })
})

module.exports = passport
