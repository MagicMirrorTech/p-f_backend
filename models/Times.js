const { Schema, model } = require('mongoose');

const timecardSchema = new Schema({
    dateIn: Date,
    dateOut: Date,
    workerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true
    },
    timeIn: Date,
    timeOut: Date
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Times', timecardSchema);
