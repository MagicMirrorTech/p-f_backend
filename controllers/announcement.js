const Announcement = require('../models/Announcement')
//const { textMessage } = require('../config/twilio')

exports.createAnnouncement = (req, res, next) => {
    const { message, teams } = req.body
    Announcement.create({...req.body })
        .then(announcement => res.status(200).json({ announcement }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneAnnouncement = (req, res, next) => {
    const { id } = req.params
    Announcement.findById(id).populate({ path: 'teams' })
        .then(announcement => res.status(200).json({ announcement }))
        .catch(err => res.status(500).json({ err }))
}

exports.getAllAnnouncements = (req, res, next) => {
    Announcement.find().populate({ path: 'teams' }).sort({ createdAt: 'desc' })
        .then(announcement => res.status(200).json({ announcement }))
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
        .then(announcement => res.status(200).json({ msg: 'Announcement Delete', announcement }))
        .catch(err => res.status(500).json({ err }))
}
