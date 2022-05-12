const { Joi } = require('celebrate');

module.exports = {
    VALIDATION: {
        GENERAL: {
            NAME: Joi.string().trim(),
            EMAIL: Joi.string().trim().email(),
            BOOLEAN: Joi.boolean().error(new Error('terms is a required field!')),
            PASSWORD: Joi.string()
        }   
    }
}