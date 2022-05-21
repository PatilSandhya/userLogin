const UserSessionModel = require('../models/userSessionModel');
const { verifyAccessToken } = require("../services/common.service");
const HTTP = require('../constant/responseCode.Constant');
exports.verifyUserSession = async (req, res, next) => {
    const checkheader = req.headers.authorization ;
    //console.log(checkheader);
    if (req.headers.authorization) {
    let authMethod = req.headers.authorization.split(" ")[0];
    let authToken = req.headers.authorization.split(" ")[1];
    if (authMethod === 'Bearer' && authToken && authToken != '' && authToken != 'null') {
      let decrypted = await verifyAccessToken(authToken);
      console.log("decypted data" + decrypted);
      if (decrypted.success) {
        let sessionData = await UserSessionModel.findOne(
          { _id: decrypted.data.sessionId }
        ).exec();
        console.log("session data " + sessionData);
        if (sessionData && sessionData.isActive) {
          res.locals.userSessionId = sessionData._id;
          res.locals.userId = sessionData.userId;
          next();
        }else res.send("invalid session");
      }
    } else res.status(HTTP.BAD_REQUEST).send({ auth: true, success: false, statusCode: HTTP.BAD_REQUEST, msg: 'Invalid authorization token' });

    //console.log(authMethod);
    //console.log(authToken);

    
  }
  }