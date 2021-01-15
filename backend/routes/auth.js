const router = require('express').Router();
const passport = require("passport")
const { create, login, logout, profile } = require('../controllers/auth');
const {isAuth} = require('../middlewares')

router.post("/signup", create)
router.post("/login", passport.authenticate("local"), login)
router.get("/logout", logout)
router.get("/profile", isAuth, profile)

module.exports = router
