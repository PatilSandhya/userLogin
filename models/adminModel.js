const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    mobile: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "A" // A-superadmin, M-manager, S-staff
    },
    isActive: {
        type: Number,
        default: 1 // 1 - active, 2 - deactive, 3 - deleted
    },
    
}, { timestamps: true, versionKey: false })

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin