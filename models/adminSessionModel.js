const mongoose = require('mongoose')

const adminSessionSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const AdminSession = mongoose.model('adminSession', adminSessionSchema)

module.exports = AdminSession;
