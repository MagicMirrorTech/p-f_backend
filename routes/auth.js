const router = require('express').Router();
const { signup, login, logout, createUser } = require('../controllers/auth')
const passport = require('../config/passport')


router.post('/signup', signup)
router.post('/createuser', createUser)
router.post('/login', passport.authenticate('local'), login)
router.post('/logout', logout)


module.exports = router;