const JoiValidation = require('joi');

const loginValidation = (data) => {
    const schema = JoiValidation.object({
        email: JoiValidation.string().required().email(),
        password: JoiValidation.string().min(6).required(),
    })

    return schema.validate(data)
}

const registerValidation = (data) => {
    const schema = JoiValidation.object({
        name: JoiValidation.string().required(),
        surname: JoiValidation.string().required(),
        email: JoiValidation.string().required().email(),
        password: JoiValidation.string().min(6).required(),
        initials: JoiValidation.string(),
        username: JoiValidation.string()
    })

    return schema.validate(data)
}

const validateConfirmPassword = (data) => {
    const schema = JoiValidation.object({
        newPassword: JoiValidation.string().min(6).max(15).required(),
        confirmPassword: JoiValidation.any().equal(JoiValidation.ref('newPassword')).required()
    })
    
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation
module.exports.validateConfirmPassword = validateConfirmPassword