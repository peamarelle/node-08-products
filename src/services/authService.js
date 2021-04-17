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

const validToken = async (token)  => {

    try {

        let user;
        // Validate if token exists
        if(!token) {
            throw new AppError('Authentication failed! Token required');
        }

        try {

            // Validate token's integrity
            const { id } = jwt.verify(token, config.auth.secret);
            logger.info(`User id in the token ${id}`);
    
            user = await userService.findById(id);
            
        } catch (error) {
            throw new AppError('Authentication failed! Invalid token', 401, token);
        }
        
        // Validate if user exists in database
        if(!user) {
            throw new AppError('Authentication failed! Invalid token - User not found', 401);
        }

        // Validate if user is enable

        if(!user.enable) {
            throw new AppError('Authentication failed! User disabled', 401);
        }

        return user;

    } catch (error) {
        throw error;
    }
};

const validRole = (user, ...roles) => {
    if(!roles.includes(user.role)) {
        throw new AppError('Autherization failed! User without privileges', 403);
    }
    return true;
};

module.exports = {
    login,
    validToken,
    validRole,
}