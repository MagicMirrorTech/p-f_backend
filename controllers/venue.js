const Venue = require('../models/Venue')

exports.createEvent(req, res, next) {

    Venue.create({ req.body })
        .then(venue => res.status(200).json({ venue }))
        .catch(err => res.status(500).json({ err }))
}

exports.getAllVenues = (req, res, next) => {
    Venue.find().populate({ path: 'tags.tagId' })
        .then(venue => res.status(200).json({ venue }))
        .catch(err => res.status(500).json({ err }))
}

exports.updateVenue = (req, res, next) => {
    const { id } = req.params
    Venue.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(venue => res.status(200).json({ venue }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteVenue = (req, res, next) => {
    const { id } = req.params
    Venue.findByIdAndDelete(id)
        .then(venue => res.status(200).json({ venue }))
        .catch(err => res.status(500).json({ err }))
}