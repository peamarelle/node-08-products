const { check } = require('express-validator');
const { findById, findUserByEmail } = require('../../services/userService');
const AppError = require('../../errors/appError');
const { ROLES } = require('../../constants/index');
const { validationResult } = require('../commons');

const _nameRequired = check('name', 'Name required').not().isEmpty();

const _lastNameRequired = check('lastName', 'Last name required').not().isEmpty();

const _emailRequired = check('email', 'Email required').not().isEmpty();

const _emailValid = check('email', 'Email is ivalid').isEmail();

const _emailExists = check('email').custom(
    async (email = '') => {
        const userFound = await findUserByEmail(email);
        if(userFound) {
            throw new AppError('Email already exists in database', 400)
        }
    }
);

const _passwordRequired = check('password', 'Password required').not().isEmpty();

const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new AppError('Invalid Role', 400)
        }
    }
);

const _dateValid = check('birthdate').optional().isDate('YYYY-MM-DD')

const _optionalEmailValid = check('email', 'Email is ivalid').optional().isEmail();

const _optionalEmailExists = check('email').optional().custom(
    async (email = '') => {
        const userFound = await findUserByEmail(email);
        if(userFound) {
            throw new AppError('Email already exists in database', 400)
        }
    }
);

const _idExists = check('id').custom(
    async (id = '') => {
        const userFound = await findById(id);
        if(!userFound) {
            throw new AppError('Id does not exists in database', 400)
        }
    }
);

const _idRequired = check('id').not().isEmpty();
const _idIsMongoDB = check('id').isMongoId();


const postRequestValidations = [
    _nameRequired,
    _lastNameRequired,
    _emailRequired,
    _passwordRequired,
    _emailValid,
    _emailExists,
    _roleValid,
    _dateValid,
    validationResult,
]

const putRequestValidations = [
    _idExists,
    _idRequired,
    _idIsMongoDB,
    _dateValid,
    _roleValid,
    _optionalEmailValid,
    _optionalEmailExists,
    validationResult
]

const requestValidations = [
    _idRequired,
    _idIsMongoDB,
    _idExists,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    requestValidations,
}