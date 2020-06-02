const { Schema, model } = require('mongoose');

const venueSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    contactName: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    tags: [String],
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

module.exports = model('Venue', venueSchema);