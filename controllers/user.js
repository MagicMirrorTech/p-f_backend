const User = require('../models/User')

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(err => res.status(500).json({ err }))
}

exports.getOneUser = (req, res, next) => {
    const { id } = req.params
    User.findById(id)
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

exports.getUsersWithoutAdmin = (req, res, next) => {
    User.find({ role: { $in: ['SITE-MANAGER', 'PAYROLL-MANAGER', 'TEAM-MATE', 'LOGISTIC-MANAGER'] } })
        .then(users => {
            res.status(200).json({ users })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserSuperAdmin = (req, res, next) => {
    User.find({ role: 'SUPER-ADMIN' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserAdmin = (req, res, next) => {
    User.find({ role: 'ADMIN' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserSiteManager = (req, res, next) => {
    User.find({ role: 'SITE-MANAGER' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserPayrollManager = (req, res, next) => {
    User.find({ role: 'PAYROLL-MANAGER' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserTeamMate = (req, res, next) => {
    User.find({ role: 'TEAM-MATE' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.getUserLogisticManager = (req, res, next) => {
    User.find({ role: 'LOGISTIC-MANAGER' })
        .then(user => {
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.updateUser = (req, res, next) => {
    const { id } = req.params
    console.log(">>>> ", req.body)
    User.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

exports.getTags = (req, res, next) => {
    let tags = [];
    User.find()
        .then(users => {
            users.forEach(user => {
                tags = tags.concat(user.tags)
            })
            res.status(200).json({ tags })
        })
        .catch(err => res.status(500).json({ err }))
}
