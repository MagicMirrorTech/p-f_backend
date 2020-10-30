const { Schema, model } = require('mongoose');

const venueUserSchema = new Schema({
    venueId: {
        type: Schema.Types.ObjectId,
        ref: "Venue"
    },
    workerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['PENDING', 'DECLINED', 'CONFIRMED'],
        default: 'PENDING'
    },
    time: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('VenueUser', venueUserSchema);
