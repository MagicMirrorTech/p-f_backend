const Times = require('../models/Times')
const User = require('../models/User')

exports.getAllTimes = (req, res, next) => {
    Times.find().populate({ path: 'workerId' })
        .then(times => res.status(200).json({ times }))
        .catch(err => res.status(500).json({ err }))
}

exports.createTimes = (req, res, next) => {
    const date = new Date()
    User.findOne({"pin": req.body.pin}).then(user =>{
        console.log("user >>>>>>> ", user)
        Times.findOne({"workerId": user}).exists('timeOut', false).then( async time =>{
            console.log("time>>>>>>>>>> ", time)
            time.timeOut = date
            time.dateOut = date
            await time.save()
            res.status(200).json({ time })
        }).catch(exception=>{
            console.log("exception>>>>>>>>> ", exception)
            let time = new Times({workerId: user._id, date: date, timeIn: date})
            Times.create(time)
                .then(time => {
                    res.status(200).json({ time })
                })
                .catch(err => res.status(500).json({ err }))
        })
    })
}

exports.deleteTimes = (req, res, next) => {
    const { id } = req.params
    Times.findByIdAndDelete(id)
        .then(time => res.status(200).json({ time }))
        .catch(err => res.status(500).json({ err }))
}
