const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['TEAM-TAG', 'EVENT-TAG', 'VENUE-TAG']
    },
    users: [
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    venues: [
        venueId: {
            type: Schema.Types.ObjectId,
            ref: "Venue"
        },
    ],
    events: [
        eventId: {
            type: Schema.Types.ObjectId,
            ref: "Event"
        },
    ],
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Tag', tagSchema);