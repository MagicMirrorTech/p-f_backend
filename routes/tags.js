const router = require('express').Router();
const { createTag, getAllTags, getEventTag, getTeamTag, getVenueTag, updateTag, deleteTag } = require('../controllers/tags')

router.post('/create', createTag)
router.get('/all', getAllTags)
router.get('/event', getEventTag)
router.get('/team', getTeamTag)
router.get('/venue', getVenueTag)
router.patch('/update/:id', updateTag)
router.delete('/delete/:id', deleteTag)

module.exports = router;