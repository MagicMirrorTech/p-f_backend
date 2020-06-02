const router = require('express').Router();
const { signup, login, loggedUser, logout, createUser } = require('../controllers/auth')
const passport = require('../config/passport')
const { verifyToken } = require('../config/jwt')


router.post('/signup', signup)
router.post('/createuser', createUser)
router.post('/login', passport.authenticate('local'), login)
router.get('/logged', verifyToken, loggedUser)
router.get('/logout', logout)



module.exports = router;