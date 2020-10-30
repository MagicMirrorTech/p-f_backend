const { Schema, model } = require('mongoose');

const eventUserSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    workerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: String,
    time: String,
    teamName: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('EventUser', eventUserSchema);
