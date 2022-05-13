const express = require('express');
const route = express.Router();
const { celebrate } = require('celebrate');
const { VALIDATION } = require("../validation/index.js");
const {userRegister, userLogin, userDetails, userLogout} = require('../controllers/userController')
const { verifyUserSession } = require('../middleware/auth')

route.get('/', (req, res)=>{
    res.send("hi" + req.body.name);
})

route.post("/register", 
 celebrate({
body: {
    name: VALIDATION.GENERAL.NAME.required(),
    email: VALIDATION.GENERAL.EMAIL.required(),
    password: VALIDATION.GENERAL.PASSWORD.required(),
    terms: VALIDATION.GENERAL.BOOLEAN.required(),
}
}), userRegister);

route.post("/login", 
 celebrate({
body: {
    email: VALIDATION.GENERAL.EMAIL,
    password: VALIDATION.GENERAL.PASSWORD,
}
}), userLogin)

.get("/details", verifyUserSession, userDetails)
.patch("/logout", verifyUserSession, userLogout)
module.exports = route;