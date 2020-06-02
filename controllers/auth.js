const User = require('../models/User')
const { createToken, createTokenU } = require('../config/jwt')
const { sendEmail } = require('../config/nodemailer')


exports.signup = (req, res, next) => {
    User.register({...req.body }, req.body.password)
        .then(user => { res.status(201).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } }) })
        .catch(err => res.status(500).json({ err }))
}

exports.createUser = (req, res, next) => {
    const { name, email, msg, password } = req.body
    User.register({...req.body }, req.body.password)
        .then(user => {
            sendEmail(email, name, msg, password)
                .then(info => {
                    res.status(200)
                })
                .catch(err => {

                    res.send(err)
                })
            res.status(201).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}


exports.login = (req, res, next) => {
    const { user } = req
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
exports.logout = (req, res, next) => {
    res.clearCookie('headload')
    res.clearCookie('signature')
    res.status(200).json({ msg: 'Logged out' })
}