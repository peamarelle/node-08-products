const { check } = require('express-validator');
const { findUserByEmail } = require('../../services/userService');
const AppError = require('../../errors/appError');
const { validationResult } = require('../commons')


const _emailRequired = check('email', 'Email required').not().isEmpty();

const _emailValid = check('email', 'Email is ivalid').isEmail();

const _emailNotExists = check('email').custom(
    async (email = '') => {
        const userFound = await findUserByEmail(email);
        if(!userFound) {
            throw new AppError('Email does not exists in database', 400)
        }
    }
);

const _passwordRequired = check('password', 'Password required').not().isEmpty();


const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _emailNotExists,
    _passwordRequired,
    validationResult,
]

module.exports = {
    postLoginRequestValidations,
}