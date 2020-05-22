const Announcement = require('../models/Announcement')
const { textMessage } = require('../config/twilio')

exports.createAnnouncement(req, res, next) => {
    const { message, tags } = req.body
    textMessage(message, phones)
        .then(info => {
            Announcement.create({...req.body })
                .then(announcement => res.status(200).json({ announcement }))
                .catch(err => res.status(500).json({ err }))
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getAllAnnouncements = (req, res, next) => {
    Announcement.find().populate({ path: 'tags.tagId' })
        .then(events => res.status(200).json({ events }))
        .catch(err => res.status(500).json({ err }))
}

exports.updateAnnouncement = (req, res, next) => {
    const { id } = req.params
    Announcement.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(announcement => res.status(200).json({ announcement }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteAnnouncement = (req, res, next) => {
    const { id } = req.params
    Announcement.findByIdAndDelete(id)
        .then(announcement => res.status(200).json({ announcement }))
        .catch(err => res.status(500).json({ err }))
}