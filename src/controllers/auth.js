const express = require('express');
const { request, response } = require('express');
const authService = require('../services/authService')
const Success = require('../handlers/successHandler');
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const login = async (req=request, res=response, next) => {

    const { email, password } = req.body;

    try {

        const userService = await authService.login(email, password);

        res.json(new Success(userService))

    } catch (error) {

        next(error);

    }
}

module.exports = {
    login,
}