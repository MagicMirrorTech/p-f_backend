const router = require('express').Router();
const { createEvent, getOneEvent, createMultiEvents,
    getAllEvents, updateEvent, deleteEvent, getTags } = require('../controllers/event')

router.post('/create', createEvent)
router.post('/createmultievents', createMultiEvents)
router.get('/all', getAllEvents)
router.get('/detail/:id', getOneEvent)
router.patch('/update/:id', updateEvent)
router.delete('/delete/:id', deleteEvent)
router.get('/getTags', getTags)

module.exports = router;
