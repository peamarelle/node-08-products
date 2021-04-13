const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../errors/appError');
const config = require('../config')
const logger = require('../loaders/logger')

const login = async (email, password) => {

    

    try {
        //Validation mail
        const user = await userService.findUserByEmail(email);
        
        if(!user) {
            throw new AppError('Authentication failed email / password does not correct.', 400);
        }

        if(!user.enable) {
            throw new AppError('Authentication failed user disabled.', 400);
        }

        //Validation password

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            throw new AppError('Authentication failed email / password does not correct.', 400);
        }

        //Generate jwt

        const token = _encrypt(user._id);

        return {
            token,
            user: user.name,
            role: user.role
        }

    } catch (error) {

        throw error;

    }

}

const _encrypt = id => {
    return jwt.sign({id}, config.auth.secret, { expiresIn: config.auth.ttl });
}

module.exports = {
    login,
}