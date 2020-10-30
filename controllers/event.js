const Event = require('../models/Event')

exports.createEvent = (req, res, next) => {
    Event.create({...req.body })
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}

exports.createMultiEvents = (req, res, next) => {
    const { events } = req.body

    events.map((e, i) => {
        Event.create({...e })
            .then(event => res.status(200).json({ event }))
            .catch(err => res.status(500).json({ err }))
    })
}

exports.getAllEvents = (req, res, next) => {
    Event.find().populate('venueId').populate({ path: 'workers.workerId' })
        .then(events => res.status(200).json({ events }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneEvent = (req, res, next) => {
    const { id } = req.params
    Event.findById(id).populate('venueId').populate({ path: 'workers.workerId' })
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}

exports.updateEvent = (req, res, next) => {
    const { id } = req.params
    Event.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteEvent = (req, res, next) => {
    const { id } = req.params
    Event.findByIdAndDelete(id)
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}