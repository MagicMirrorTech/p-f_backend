const { Schema, model } = require('mongoose');

const announcementSchema = new Schema({
    subject: String,
    description: String,
    type: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH']
    },
    teams: [{
        teamId: {
            type: Schema.Types.ObjectId,
            ref: "Team"
        },
    }],
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Announcement', announcementSchema);