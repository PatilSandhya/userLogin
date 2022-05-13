const UserSessionModel = require('../models/userSessionModel');

const removePreviousUserSession = async (id, multi, resetdaily) => {
    if (multi) {
        console.log("in multi");
        const userIdCondition = id && Array.isArray(id) && id.length > 0 ? { $in: id } : id;
        console.log(userIdCondition);
        await UserSessionModel.updateMany({ userId: userIdCondition, isActive: true }, { isActive: false });
    }
    else await UserSessionModel.updateOne({ _id: id }, { isActive: false });

   // if (!resetdaily) await DriverModel.updateOne({ _id: id }, { isAdminApproved: false });
}

module.exports ={
    removePreviousUserSession
}