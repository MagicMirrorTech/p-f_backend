const User = require('../models/User')
const { createToken, createTokenU } = require('../config/jwt')
const { sendEmail } = require('../config/nodemailer')


exports.signup = (req, res, next) => {
    User.register({...req.body }, req.body.password)
        .then(user => {
            const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user
            res.status(201).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.createUser = (req, res, next) => {
    const { name, email, password } = req.body
    User.register({...req.body }, req.body.password)
        .then(user => {
            const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user

            sendEmail(email, name, password)
                .then(info => {
                    res.status(200).json({ msg: 'Email sent', user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
                })
                .catch(err => {

                    res.send(err)
                })
        })
        .catch(err => res.status(500).json({ err }))
}


exports.login = (req, res, next) => {
    const { user } = req
    const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user

    const [header, payload, signature] = createToken(user)
    res.cookie('headload', `${header}.${payload}.`, {
        maxAge: 1000 * 60 * 30,
        secure: true
    })
    res.cookie('signature', signature, {
        httpOnly: true,
        secure: true
    })
    res.status(200).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
}

exports.loggedUser = (req, res, next) => {
    const { user } = req
    const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user

    res.status(200).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
}

exports.logout = (req, res, next) => {
    res.clearCookie('headload')
    res.clearCookie('signature')
    res.status(200).json({ msg: 'Logged out' })
}

exports.updateUser = (req, res, next) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, {...req.body }, { new: true })
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

exports.upload = (req, res) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, { img: req.file.url }, { new: true })
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}

exports.deleteUser = (req, res, next) => {
    const { id } = req.params
    User.findByIdAndDelete(id)
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(500).json({ err }))
}