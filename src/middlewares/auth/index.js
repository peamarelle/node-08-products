const { check } = require('express-validator');
const { findUserByEmail } = require('../../services/userService');
const AppError = require('../../errors/appError');
const { validationResult } = require('../commons');
const { validToken, validRole } = require('../../services/authService');


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

const validJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const hasRole = (...roles) => {
    return (req, res, next) => {
        try {
            validRole(req.user, ...roles);
            next();
        } catch (error) {
            next(error);
        }
    }
};

const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _emailNotExists,
    _passwordRequired,
    validationResult,
]

module.exports = {
    postLoginRequestValidations,
    validJWT,
    hasRole,
}