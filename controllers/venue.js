const Venue = require('../models/Venue')
const User = require('../models/User')
const VenueUser = require('../models/Venue_User')

exports.createVenue = (req, res, next) => {
    Venue.create({...req.body })
        .then(venue => {
            let workers = req.body.workers
            workers.forEach(worker =>{
                User.findById(worker).then(user =>{
                    VenueUser.create({
                        venueId: venue._id,
                        workerId: user._id,
                    })
                }).catch(exception=>{
                    User.find({tags: worker}).then(users =>{
                        users.forEach(user => {
                            VenueUser.create({
                                venueId: venue._id,
                                workerId: user._id,
                            })
                        })
                    })
                })
            })
            res.status(200).json({ venue })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getAllVenues = (req, res, next) => {
    Venue.find().populate({ path: 'workers.workerId' })
        .then(venues => res.status(200).json({ venues }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneVenue = (req, res, next) => {
    const { id } = req.params
    Venue.findById(id).lean()
        .then(async venue => {
            venue["users"] = []
            let users = await VenueUser.find({'venueId': id }).populate("workerId")
            users.forEach(user => {
                venue["users"].push(user.workerId)
            })
            res.status(200).json({ venue })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.updateVenue = (req, res, next) => {
    const { id } = req.params
    Venue.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(venue => {
            let workers = req.body.workers
            workers.forEach(worker =>{
                User.findById(worker).then(user =>{
                    VenueUser.create({
                        venueId: venue._id,
                        workerId: user._id,
                    })
                }).catch(exception =>{
                    User.find({tags: worker}).then(users =>{
                        users.forEach(user => {
                            VenueUser.create({
                                venueId: venue._id,
                                workerId: user._id,
                            })
                        })
                    })
                })
            })
            res.status(200).json({ venue })
        })
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
            tags = [...new Set(tags)]
            res.status(200).json({ tags })
        })
        .catch(err => res.status(500).json({ err }))
}
