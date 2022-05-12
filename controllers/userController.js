var userModel = require('../models/userModel');
var UserSessionModel = require('../models/userSessionModel')
require('../loaders/mongoose');
const { createAccessToken } = require("../services/common.service");

const createNewSession = async (payload) => {
    payload.userId = payload.userId;
    const sessionData = await new UserSessionModel(payload).save();
    return sessionData.toObject();
}

const userRegister = async (req, res) =>{
    const reqData = req.body;
    console.log(reqData);
    const checkEmail = await userModel.find({ email: reqData.email})
    if (checkEmail && checkEmail.length > 0) {
        return res.status(422).send({ msg: "Please check again! This email is already registered!", data: {} });
    }
    if(reqData.terms == false){
        return res.status(422).send({ msg: "accept terms", data: {} });
    }
    reqData.terms = true;
    const newUser = new userModel(reqData)
    const userData = await newUser.save();
    res.send("user registered");
}

const userLogin = async (req, res) =>{
    const reqData = req.body;
    
    const email = req.body.email;
    console.log(email);
    const checkUser = await userModel.find({ email: reqData.email});
    console.log(checkUser);
    if (!checkUser || checkUser && checkUser.length == 0) {
        return res.status(404).send({ msg: "Please check again! This email is not registered!", data: {} });
    }

    const userObj = checkUser[0];
    const sessionData = await createNewSession({ email, userId: userObj._id });
    const userData = {
       
        token: await createAccessToken(sessionData._id)
    }
    return res.status(200).send({ msg: "Login successfully", data: userData });
}

module.exports = {
    userRegister,
    userLogin
}