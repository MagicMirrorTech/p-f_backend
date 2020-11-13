const router = require('express').Router();
const { createAnnouncement, getOneAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement, getTags }
    = require('../controllers/announcement')

router.post('/create', createAnnouncement)
router.get('/all', getAllAnnouncements)
router.get('detail/:id', getOneAnnouncement)
router.patch('/update/:id', updateAnnouncement)
router.delete('/delete/:id', deleteAnnouncement)
router.get('/getTags', getTags)

module.exports = router;
