const Team = require('../models/Team')

exports.createTeam = (req, res, next) => {
    Team.create({...req.body })
        .then(team => res.status(200).json({ team }))
        .catch(err => res.status(500).json({ err }))
}
exports.getOneTeam = (req, res, next) => {
    const { id } = req.params
    Team.findById(id).populate({ path: 'teams' })
        .then(team => res.status(200).json({ team }))
        .catch(err => res.status(500).json({ err }))
}
exports.getAllTeams = (req, res, next) => {
    Team.find().populate({ path: 'users' })
        .then(teams =>
            res.status(200).json({ teams }))
        .catch(err => res.status(500).json({ err }))
}

exports.updateTeam = (req, res, next) => {
    const { id } = req.params
    Team.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(team => res.status(200).json({ team }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteTeam = (req, res, next) => {
    const { id } = req.params
    Team.findByIdAndDelete(id)
        .then(team => res.status(200).json({ team }))
        .catch(err => res.status(500).json({ err }))
}