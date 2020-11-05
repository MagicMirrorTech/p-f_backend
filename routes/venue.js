const router = require('express').Router();
const { createVenue, getAllVenues, getOneVenue, updateVenue, deleteVenue, getTags } = require('../controllers/venue')


router.post('/create', createVenue)
router.get('/all', getAllVenues)
router.get('/detail/:id', getOneVenue)
router.patch('/update/:id', updateVenue)
router.delete('/delete/:id', deleteVenue)
router.get('/getTags', getTags)

module.exports = router;
