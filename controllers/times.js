const Times = require('../models/Times')
const User = require('../models/User')

exports.getAllTimes = (req, res, next) => {
    Times.find().populate({ path: 'workerId' }).sort({timeIn: -1})
        .then(times => res.status(200).json({ times }))
        .catch(err => res.status(500).json({ err }))
}

exports.createTimes = (req, res, next) => {
    const date = new Date()
    User.findOne({"pin": req.body.pin}).then(user =>{
        Times.findOne({"workerId": user}).exists('timeOut', false).then( async time =>{
            time.timeOut = date
            time.dateOut = date
            await time.save()
            res.status(200).json({ time })
        }).catch(exception=>{
            if(user){
                let time = new Times({workerId: user._id, date: date, timeIn: date})
                Times.create(time)
                    .then(time => {
                        res.status(200).json({ time })
                    })
                    .catch(err => res.status(500).json({ err }))
            }else{
                res.status(500).json({"error": "user not found"})
            }

        })
    })
}

exports.deleteTimes = (req, res, next) => {
    const { id } = req.params
    Times.findByIdAndDelete(id)
        .then(time => res.status(200).json({ time }))
        .catch(err => res.status(500).json({ err }))
}
