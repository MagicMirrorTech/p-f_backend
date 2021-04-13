const User = require('../models/User')
const { createToken, createTokenU } = require('../config/jwt')
const { sendEmail } = require('../config/nodemailer')
const nodePin = require('node-pin');
const generator = require('generate-password');

exports.signup = (req, res, next) => {
    User.register({...req.body }, req.body.password)
        .then(user => {
            const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user
            res.status(201).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.createUser = async(req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user === null) {
        let password = generator.generate({
            length: 10,
            numbers: true
        });
        let user = {...req.body}
        user.password = password
        user.pin = nodePin.generateRandPin(4);
        User.create(user)
            .then(user => {
                console.log(user)
                const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user
                sendEmail(email, name, password, pin)
                    .then(info => {
                        res.status(200).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                console.log("error?", err)
                res.status(500).json({ err })
            })
    } else {
            res.status(500).json({ message: 'A teammate with the given email is already registered' })
    }
}

exports.resendPincode = async(req, res, next) => {
    const { id } = req.params
    const user = await User.findById(id)
    user.pin = nodePin.generateRandPin(4)
    User.create(user)
        .then(async user => {
            await sendEmail(user.email, user.name, user.password, user.pin)
            res.status(200).json({ user })
        })
        .catch(err => res.status(500).json({ err }))
}

exports.login = (req, res, next) => {
    const { user } = req
    const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } = user

    const [header, payload, signature] = createToken(user)
    res.cookie('headload', `${header}.${payload}.`, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        sameSite: true
    })
    res.cookie('signature', signature, {
        httpOnly: true,
        sameSite: true
    })
    res.status(200).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img } })
}

exports.loggedUser = (req, res, next) => {
    const { user } = req
    const { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img, tags } = user

    res.status(200).json({ user: { role, email, events, teams, name, _id, address, contact, phone, mobile, payment, effective, timeIn, timeOut, pin, img, tags } })
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
