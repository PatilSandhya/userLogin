const UserSessionModel = require('../models/userSessionModel');
const { verifyAccessToken } = require("../services/common.service");

exports.verifyUserSession = async (req, res, next) => {
    const checkheader = req.headers.authorization ;
    //console.log(checkheader);
    if (req.headers.authorization) {
    let authMethod = req.headers.authorization.split(" ")[0];
    let authToken = req.headers.authorization.split(" ")[1];
    if (authMethod === 'Bearer' && authToken && authToken != '' && authToken != 'null') {
      let decrypted = await verifyAccessToken(authToken);
      console.log(decrypted);
      if (decrypted.success) {
        let sessionData = await UserSessionModel.findOne(
          { _id: decrypted.data.sessionId }
        ).exec();
        console.log(sessionData);
      }
    } else res.status(422).send({ auth: true, success: false, statusCode: 422, msg: 'Invalid authorization token' });

    //console.log(authMethod);
    //console.log(authToken);

    next();
  }
  }