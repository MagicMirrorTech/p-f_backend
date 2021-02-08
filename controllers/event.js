const Event = require('../models/Event')
const User = require('../models/User')
const EventUser = require('../models/Event_User')

exports.createEvent = (req, res, next) => {
    Event.create({...req.body })
        .then(event => {
            let workers = req.body.workers
            workers.forEach(worker =>{
                User.findById(worker).then(user =>{
                    EventUser.create({
                        eventId: event._id,
                        workerId: user._id,
                    })
                }).catch(exception=>{
                    User.find({tags: worker}).then(users =>{
                        users.forEach(user => {
                            EventUser.create({
                                eventId: event._id,
                                workerId: user._id,
                            })
                        })
                    })
                })
            })
            res.status(200).json({ event })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.createCopyEvent = (req, res, next) => {
    console.log(req.body)
    const {id, name} = req.body
    Event.findById(id).populate().then(async eventCopy => {
        let workers = await EventUser.find({'eventId': id }).populate("workerId")
        Event.create({name, tags: eventCopy.tags, contact: eventCopy.contact, phone: eventCopy.phone,
            mobile: eventCopy.mobile, timeStart: eventCopy.timeStart, timeEnd: eventCopy.timeEnd,
            venueId: eventCopy.venueId, type: eventCopy.type, date: eventCopy.date})
            .then(async event => {
                console.log(event);
                workers.forEach(worker =>{
                    User.findById(worker).then(user =>{
                        EventUser.create({
                            eventId: event._id,
                            workerId: user._id,
                        })
                    }).catch(exception=>{
                        User.find({tags: worker}).then(users =>{
                            users.forEach(user => {
                                EventUser.create({
                                    eventId: event._id,
                                    workerId: user._id,
                                })
                            })
                        })
                    })
                })
                res.status(200).json({ event })
            })
            .catch(err => res.status(500).json({ err }))
    })
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
    Event.find().populate('venueId').populate({ path: 'workers.workerId' }).lean()
        .then(events => res.status(200).json({ events }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneEvent = (req, res, next) => {
    const { id } = req.params
    Event.findById(id).populate('venueId').lean()
        .then(async event => {
            event["users"] = []
            let users = await EventUser.find({'eventId': id }).
                populate("workerId")
            users.forEach(user => {
                event["users"].push(user.workerId)
                event["venue"] = event.venueId
                event["venueId"] = event.venueId._id
            })
            res.status(200).json({ event })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.updateEvent = async (req, res, next) => {
    const { id } = req.params
    await EventUser.deleteMany({'eventId': id })

    Event.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(event => {
            let workers = req.body.workers
            workers.forEach(worker =>{
                User.findById(worker).then(user =>{
                    EventUser.create({
                        eventId: event._id,
                        workerId: user._id,
                    })
                }).catch(exception => {
                    User.find({tags: worker}).then(users =>{
                        users.forEach(user => {
                            EventUser.create({
                                eventId: event._id,
                                workerId: user._id,
                            })
                        })
                    })
                })
            })
            res.status(200).json({ event })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.deleteEvent = (req, res, next) => {
    const { id } = req.params
    Event.findByIdAndDelete(id)
        .then(event => res.status(200).json({ event }))
        .catch(err => res.status(500).json({ err }))
}

exports.getTags = (req, res, next) => {
    let tags = [];
    Event.find()
        .then(events => {
            events.forEach(event => {
                tags = tags.concat(event.tags)
            })
            tags = [...new Set(tags)]
            res.status(200).json({ tags })
        })
        .catch(err => res.status(500).json({ err }))
}
