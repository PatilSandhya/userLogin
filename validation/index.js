const { Joi } = require('celebrate');

module.exports = {
    VALIDATION: {
        GENERAL: {
            NAME: Joi.string().trim(),
            EMAIL: Joi.string().trim().email(),
           // BOOLEAN: Joi.boolean()
        }   
    }
}