const express = require('express');
const route = express.Router();
const { celebrate } = require('celebrate');
const { VALIDATION } = require("../validation/index.js");
const {userRegister, userLogin} = require('../controllers/userController')
const { verifyUserSession } = require('../middleware/auth')

route.get('/', (req, res)=>{
    res.send("hellow" + req.body.name);
})

route.post("/register", 
 celebrate({
body: {
    name: VALIDATION.GENERAL.NAME,
    email: VALIDATION.GENERAL.EMAIL,
    password: VALIDATION.GENERAL.PASSWORD,
    terms: VALIDATION.GENERAL.BOOLEAN.required(),
}
}), userRegister);

route.post("/login", 
 celebrate({
body: {
    email: VALIDATION.GENERAL.EMAIL,
    password: VALIDATION.GENERAL.PASSWORD,
}
}), userLogin);

module.exports = route;