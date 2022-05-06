var userModel = require('../models/userModel');
require('../loaders/mongoose');

const userRegister = async (req, res) =>{
    const reqData = req.body;
    console.log(reqData);
    //const checkEmail = await userModel.find({ email: reqData.email})
    const newUser = new userModel(reqData)
    const userData = await newUser.save();
    res.send("user registered");
}

module.exports = {
    userRegister
}