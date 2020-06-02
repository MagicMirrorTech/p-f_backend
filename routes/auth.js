const router = require('express').Router();
const { signup, login, logout, createUser } = require('../controllers/auth')

router.post('/signup', signup)
router.post('/createuser', createUser)
router.post('/login', login)
router.post('/logout', logout)


module.exports = router;