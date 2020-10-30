const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
    name: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Team', teamSchema);