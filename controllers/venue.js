const Venue = require('../models/Venue')

exports.createVenue = (req, res, next) => {
    Venue.create({...req.body })
        .then(venue => res.status(200).json({ venue }))
        .catch(err => res.status(500).json({ err }))
}

exports.getAllVenues = (req, res, next) => {
    Venue.find().populate({ path: 'workers.workerId' })
        .then(venues => res.status(200).json({ venues }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneVenue = (req, res, next) => {
    const { id } = req.params
    Venue.findById(id).populate({ path: 'workers.workerId' })
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

exports.getTags = (req, res, next) => {
    let tags = [];
    Venue.find()
        .then(venues => {
            venues.forEach(venue => {
                tags = tags.concat(venue.tags)
            })
            res.status(200).json({ tags })
        })
        .catch(err => res.status(500).json({ err }))
}
