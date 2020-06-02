const router = require('express').Router();
const { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcement')

router.post('/create', createAnnouncement)
router.get('/all', getAllAnnouncements)
router.patch('/update/:id', updateAnnouncement)
router.delete('/delete/:id', deleteAnnouncement)

module.exports = router;