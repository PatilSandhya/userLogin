var userModel = require('../models/userModel');
var UserSessionModel = require('../models/userSessionModel')
require('../loaders/mongoose');
const { createAccessToken } = require("../services/common.service");
const { removePreviousUserSession } = require('../controllers/commonController');


const createNewSession = async (payload) => {
    payload.userId = payload.userId;
    const sessionData = await new UserSessionModel(payload).save();
    return sessionData.toObject();
}

const userRegister = async (req, res) =>{
    const reqData = req.body;
    console.log(reqData);
    const checkEmail = await userModel.find({ email: reqData.email})
    //const checkData = await userModel.findOne({ email: reqData.email})
    //console.log("find " + checkEmail);
    //console.log("findOne " + checkData);
    console.log(checkEmail);
    if (checkEmail && checkEmail.length > 0) {
        return res.status(422).send({ msg: "Please check again! This email is already registered!", data: {} });
    }
    if(reqData.terms == false){
        return res.status(422).send({ msg: "accept terms", data: {} });
    }
    reqData.terms = true;
    const newUser = new userModel(reqData)
    const userData = await newUser.save();
    return res.status(200).send({ msg: "User register successfully", data: userData });
}

const userLogin = async (req, res) =>{
    const reqData = req.body;
    
    const email = req.body.email;
    console.log(email);
    const checkUser = await userModel.find({ email: reqData.email});
    let userRole = checkUser.map(({ role }) => role)
    console.log("role >" + userRole);
    console.log(checkUser);
    if (!checkUser || checkUser && checkUser.length == 0) {
        return res.status(404).send({ msg: "Please check again! This email is not registered!", data: {} });
    }

    const userObj = checkUser[0];
    const sessionData = await createNewSession({ email, userId: userObj._id });
    const userData = {
       
        token: await createAccessToken(sessionData._id),
        email: email,
        role: userRole
    }
    return res.status(200).send({ msg: "Login successfully", data: userData });
}

const userDetails = async (req, res, next) =>{
    const userId = res.locals.userId;
    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).send({ msg: "User not found", data: {} });

    console.log(userData);
    res.send(userData);
}

const userLogout = async (req, res, next) =>{
    try{
        const { userId } = res.locals,
            userSessionId = res.locals.userSessionId,
            checkUserExists = await userModel.findOne({ _id: userId });
            
            if (checkUserExists) {
                await removePreviousUserSession(userSessionId, false);
                return res.send("logout");
            } else return res.send("User not found");
    }catch(err){
        next(err);
    }
}

module.exports = {
    userRegister,
    userLogin,
    userDetails,
    userLogout
}