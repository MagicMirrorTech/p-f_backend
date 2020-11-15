const router = require('express').Router();
const { getAllTimes, createTimes, deleteTimes} = require('../controllers/times')

router.get('/all', getAllTimes)
router.post('/create', createTimes)
router.delete('/delete/:id', deleteTimes)

module.exports = router;
