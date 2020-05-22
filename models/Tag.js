const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    name: String,
    type: {
        type: String,
        enum: ['TEAM-TAG', 'EVENT-TAG', 'VENUE-TAG']
    },
    workers: [
        workerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ],
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Tag', tagSchema);