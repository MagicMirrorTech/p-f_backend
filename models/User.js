const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    email: String,
    name: String,
    address: String,
    contact: String,
    phone: Number,
    mobile: Number,
    activity: String,
    img: String,
    payment: Number,
    effective: Number,
    timeIn: String,
    timeOut: String,
    pin: String,
    role: {
        type: String,
        enum: ['SUPER-ADMIN', 'ADMIN', 'SITE-MANAGER', 'PAYROLL-MANAGER', 'TEAM-MATE', 'LOGISTIC-MANAGER'],
        default: 'ADMIN'
    },
    type: String,
    events: [{
        type: Schema.Types.ObjectId,
        ref: "Event"
    }],
    hoursScheduled: String,
    hoursWorked: String,
    tags: [String],
    resetPasswordToken: String,
    resetPasswordExpires: Date,

}, {
    timestamps: true,
    versionKey: false
});

userSchema.plugin(PLM, { usernameField: 'email' });
module.exports = model('User', userSchema);
