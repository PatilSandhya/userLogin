const HTTP = require('../constant/responseCode.Constant');
const AdminModel = require('../models/adminModel');
const userModel = require('../models/userModel')
const AdminSessionModel = require('../models/adminSessionModel');
const UserSessionModel = require('../models/userSessionModel')
const { encryptPassword, comparePassword, createAccessToken } = require('../services/common.service');

const createNewSession = async (payload) => {
    payload.adminId = payload.adminId;
    const sessionData = await new AdminSessionModel(payload).save();
    return sessionData.toObject();
}

const createNewSessionUser = async (payload) => {
    payload.adminId = payload.adminId;
    const sessionData = await new UserSessionModel(payload).save();
    return sessionData.toObject();
}

const userRegister = async (req, res) =>{
    const reqData = req.body;
    const { name, email, password, role } = req.body;

    console.log(role);
    if(role == "AC"){
        const checkEmail = await userModel.findOne({email})
        console.log("check mail" + checkEmail);
        if (checkEmail && Object.keys(checkEmail).length > 0) {
            return res.status(422).send({ msg: "Please check again! This email is already registered!", data: {} });
        }
        
        //reqData.terms = true;
        const userObj = {
            name,
            email,
            password: await encryptPassword(password),
            role,
            
        }
        const newUser = new userModel(userObj)
        const userData = await newUser.save();
        return res.status(200).send({ msg: "User register successfully", data: userData });
    }
    if(role == "A"){
        const adminData = await AdminModel.findOne({ email });
    if (adminData && Object.keys(adminData).length > 0) return res.status(HTTP.ALREADY_EXISTS).send({ msg: "Email already registered" });
    const adminObj = {
        name,
        email,
        password: await encryptPassword(password),
        role,
        
    }
    const newAdmin = new AdminModel(adminObj)
    await newAdmin.save();
    return res.status(HTTP.SUCCESS).send({ msg: "Admin added successfully", data: newAdmin });

    }
    
}

const adminRegister = async (req, res, next) =>{
    const { name, email, password, role } = req.body;

    const adminData = await AdminModel.findOne({ email });
    if (adminData && Object.keys(adminData).length > 0) return res.status(HTTP.ALREADY_EXISTS).send({ msg: "Email already registered" });

    if (role != "A" ) {
        return res.status(HTTP.BAD_REQUEST).send({ msg: "Please check all required fields. Please try again!" });
    }
    const adminObj = {
        name,
        email,
        password: await encryptPassword(password),
        role,
        
    }
    const newAdmin = new AdminModel(adminObj)
    await newAdmin.save();
    return res.status(HTTP.SUCCESS).send({ msg: "Admin added successfully", data: newAdmin });

}


const login = async (req, res, next) => {
    const { email, password } = req.body;

    const currentAdmin = await AdminModel.findOne({ email });
    //const currentUser = await userModel.findOne({ email });
    if (!currentAdmin || Object.keys(currentAdmin).length == 0){ 

        const currentUser = await userModel.findOne({ email });
        if (!currentUser || Object.keys(currentUser).length == 0) return res.status(HTTP.NOT_FOUND).send({ msg: "Admin not found" });
    
        const isPasswordMatch = await comparePassword(password, currentUser.password);
        const role = currentUser.role;
        if (!isPasswordMatch) {
            return res.status(HTTP.CONFLICT).send({ msg: "Password is not valid" });
        }
    
        const sessionData = await createNewSessionUser({ email, userId: currentUser._id });
    
        const adminData = {
            token: await createAccessToken(sessionData._id),
            email: email,
            role: role
        }
        
        return res.status(HTTP.SUCCESS).send({ msg: 'user login successfully', data: adminData })
        
    }
    
    
    const isPasswordMatch = await comparePassword(password, currentAdmin.password);
    if (!isPasswordMatch) {
        return res.status(HTTP.CONFLICT).send({ msg: "Password is not valid" });
    }

    const sessionData = await createNewSession({ email, password, adminId: currentAdmin._id });

    const adminData = {
        ...currentAdmin._doc,
        token: await createAccessToken(sessionData._id)
    }
    delete adminData.password;
    res.status(HTTP.SUCCESS).send({ msg: 'Admin login successfully', data: adminData })
}



module.exports = {
    userRegister,
    adminRegister,
    login,
    
}