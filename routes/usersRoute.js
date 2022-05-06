const express = require('express');
const route = express.Router();
const { celebrate } = require('celebrate');
const { VALIDATION } = require("../validation/index.js");
const {userRegister} = require('../controllers/userController')
const { Joi } = celebrate;

route.get('/', (req, res)=>{
    res.send("hellow" + req.body.name);
})

route.post("/register", 
 celebrate({
body: {
    name: VALIDATION.GENERAL.NAME,
}
}),  userRegister);

module.exports = route;