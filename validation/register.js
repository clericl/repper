const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required!";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid!"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required."
    }

    if (!Validator.isLength(data.password, { min: 6, max: 18 })) {
        errors.password = "Password must be between 6 and 18 characters."
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Please confirm your password."
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match."
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};