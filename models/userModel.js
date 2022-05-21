const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    role: {
        type: String,
        default: "S" // A-superadmin, M-manager, S-staff, AC-accountant
    },
    isAdminApproved: {
        type: Boolean,
        required: true,
        default: true,
    },

}, { timestamps: true, versionKey: false })

const user = mongoose.model('USER', userSchema)

module.exports = user