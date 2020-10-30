const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    name: String,
    date: Date,
    contact: String,
    phone: Number,
    mobile: Number,
    timeStart: String,
    timeEnd: String,
    venueId: {
        type: Schema.Types.ObjectId,
        ref: "Venue"
    },
    type: {
        type: String,
        enum: ['WEDDING', 'BIRTHDAY', 'PARTY', 'OTHER']
    },
    tags: [String]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Event', eventSchema);
