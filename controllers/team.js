const Tag = require('../models/Team')

exports.createTag = (req, res, next) => {
    Tag.create({...req.body })
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}

exports.getAllTeams = (req, res, next) => {
    Tag.find().populate('venueId').populate({ path: 'users.userId' }).populate({ path: 'events.eventId' })
        .then(events =>

            res.status(200).json({ events }))
        .catch(err => res.status(500).json({ err }))
}

exports.getTeamTag = (req, res, next) => {
    Tag.find({ type: 'TEAM-TAG' }).populate({ path: 'users.userId' }).populate({ path: 'events.eventId' }).populate({ path: 'venues.venueId' })
        .then(tags => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getEventTag = (req, res, next) => {
    Tag.find({ type: 'EVENT-TAG' }).populate({ path: 'users.userId' }).populate({ path: 'events.eventId' }).populate({ path: 'venues.venueId' })
        .then(tags => {
            res.status(200).json({ tags })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getVenueTag = (req, res, next) => {
    Tag.find({ type: 'VENUE-TAG' }).populate({ path: 'users.userId' }).populate({ path: 'events.eventId' }).populate({ path: 'venues.venueId' })
        .then(tags => {
            res.status(200).json({ tags })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.updateTag = (req, res, next) => {
    const { id } = req.params
    Tag.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteTag = (req, res, next) => {
    const { id } = req.params
    Tag.findByIdAndDelete(id)
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}