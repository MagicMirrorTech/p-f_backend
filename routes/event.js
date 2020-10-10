const router = require('express').Router();
const { createEvent, getOneEvent, createMultiEvents, getAllEvents, updateEvent, deleteEvent } = require('../controllers/event')

router.post('/create', createEvent)
router.post('/createmultievents', createMultiEvents)
router.get('/allevents', getAllEvents)
router.get('/detail/:id', getOneEvent)
router.patch('/update/:id', updateEvent)
router.delete('/delete/:id', deleteEvent)


module.exports = router;