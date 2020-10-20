const router = require('express').Router();
const { createTeam, getAllTeams, updateTeam, deleteTeam } = require('../controllers/team')

router.post('/create', createTeam)
router.get('/all', getAllTeams)
router.get('/detail/:id', updateTeam)
router.patch('/update/:id', updateTeam)
router.delete('/delete/:id', deleteTeam)

module.exports = router;