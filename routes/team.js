const router = require('express').Router();
const { createTag, getAllTeams, getEventTag, getTeamTag, getVenueTag, updateTag, deleteTag } = require('../controllers/team')

router.post('/create', createTag)
router.get('/all', getAllTeams)
router.get('/event', getEventTag)
router.get('/team', getTeamTag)
router.get('/venue', getVenueTag)
router.patch('/update/:id', updateTag)
router.delete('/delete/:id', deleteTag)

module.exports = router;