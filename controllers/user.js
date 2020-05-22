const User = require('../models/User')

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneUser = (req, res, next) => {
    const { id } = req.params
    User.findById(id).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

exports.getUsersWithoutAdmin = (req, res, next) => {
    User.find({ role: { $in: ['SITE-MANAGER', 'PAYROLL-MANAGER', 'TEAM-MATE', 'LOGISTIC-MANAGER'] } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserSuperAdmin = (req, res, next) => {
    User.find({ role: { 'SUPER-ADMIN' } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserAdmin = (req, res, next) => {
    User.find({ role: { 'ADMIN' } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserSiteManager = (req, res, next) => {
    User.find({ role: { 'SITE-MANAGER' } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserPayrollManager = (req, res, next) => {
    User.find({ role: { 'PAYROLL-MANAGER' } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserTeamMate = (req, res, next) => {
    User.find({ role: { 'TEAM-MATE' } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserLogisticManager = (req, res, next) => {
    User.find({ role: { 'LOGISTIC-MANAGER' } }).populate({ path: 'events.eventId' }).populate({ path: 'tags.tagId' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.updateUser = (req, res, next) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteUser = (req, res, next) => {
    const { id } = req.params
    User.findByIdAndDelete(id)
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}