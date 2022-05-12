const mongoose = require('mongoose')

const userSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
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

const UserSession = mongoose.model('userSession', userSessionSchema)

module.exports = UserSession;
