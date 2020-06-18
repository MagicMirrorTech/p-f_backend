const router = require('express').Router();
const { signup, login, loggedUser, logout, createUser, updateUser, upload } = require('../controllers/auth')
const passport = require('../config/passport')
const { verifyToken } = require('../config/jwt')
const uploadCloud = require('../config/cloudinary')

router.post('/signup', signup)
router.post('/createuser', createUser)
router.post('/login', passport.authenticate('local'), login)
router.get('/logged', verifyToken, loggedUser)
router.get('/logout', logout)
router.post('/upload', uploadCloud.single('photo'), upload)
router.patch('/update/:id', updateUser)


module.exports = router;