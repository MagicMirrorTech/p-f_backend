const router = require('express').Router();
const { signup, login, loggedUser, logout, createUser, updateUser, upload, deleteUser, userDetail } = require('../controllers/auth')
const passport = require('../config/passport')
const { verifyToken } = require('../config/jwt')
const uploadCloud = require('../config/cloudinary')

router.post('/signup', signup)
router.post('/createuser', createUser)
router.post('/login', passport.authenticate('local'), login)
router.get('/logged', verifyToken, loggedUser)
router.get('/logout', logout)
router.patch('/upload/:id', uploadCloud.single('photo'), upload)
router.patch('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)



module.exports = router;