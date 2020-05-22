const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    name: String,
    date: Date,
    contact: String,
    phone: Number,
    mobile: Number,
    timeStart: Date,
    timeEnd: Date,
    VenueId: {
        type: Schema.Types.ObjectId,
        ref: "Venue"
    },
    type: {
        type: String,
        enum: ['WEDDING', 'BIRTHDAY', 'PARTY']
    },
    tags: [
        tagId: {
            type: Schema.Types.ObjectId,
            ref: "Tag"
        },
    ],
    workers: [{
        workerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        status: String,
        time: String
    }],
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Event', eventSchema);