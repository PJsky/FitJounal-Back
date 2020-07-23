//Validation
const Joi = require('@hapi/joi');


//Register
const registerValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        password_confirmation: Joi.string()
    });

    return schema.validate(data);
}

const loginValidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;