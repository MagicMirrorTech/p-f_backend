const { Schema, model } = require('mongoose');

const announcementSchema = new Schema({
    subject: String,
    description: String,
    type: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH']
    },
    tags: [String]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Announcement', announcementSchema);
