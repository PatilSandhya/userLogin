const route = require("express").Router();
const { celebrate } = require('celebrate');
const { VALIDATION } = require('../validation/index');
const {userRegister, adminRegister, login} = require('../controllers/adminController');

route.post("/addUser", 
 celebrate({
body: {
    name: VALIDATION.GENERAL.NAME.required(),
    email: VALIDATION.GENERAL.EMAIL.required(),
    password: VALIDATION.GENERAL.PASSWORD.required(),
    role: VALIDATION.GENERAL.STRING.required().valid('A', 'M', 'S', 'AC'),

}
}), userRegister);

route.post('/adminRegister',
celebrate({
    body: {
        name: VALIDATION.GENERAL.NAME.required(),
        email: VALIDATION.GENERAL.EMAIL.required(),
        password: VALIDATION.GENERAL.PASSWORD.required(),
        role: VALIDATION.GENERAL.STRING.required().valid('A', 'M', 'S', 'AC'), 
    }
}), adminRegister);

route.post("/login", 
 celebrate({
body: {
    email: VALIDATION.GENERAL.EMAIL,
    password: VALIDATION.GENERAL.PASSWORD,
}
}), login)

module.exports = route;
