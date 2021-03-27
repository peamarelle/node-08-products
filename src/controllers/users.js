const express = require('express');
const User = require('../models/user')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getAllUsers = async (req, res, next) => {

    try {
        let users = await User.find();
        res.json(users);

    } catch (error) {
        next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const createUser = async (req, res, next) => {
    try {

        const user = req.body;

        const userCreated = await User.create(user)

        const result = {
            message: 'User created',
            userCreated
        }

        res.status(201).json(result);

    } catch (error) {
        next(error);
    }

}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = req.body;

        const userUpdated = await User.findByIdAndUpdate(id, user, { new: true })

        const result = {
            message: `User with id: ${id} updated!`,
            userUpdated
        }

        res.json(result);

    } catch (error) {
        next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const updatePartialUser = (req, res) => {

    const message = {
        message: 'User updated with patch!'
    }

    res.json(message);
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        let user = await User.findById(id);
        user.remove();

        const result = {
            message: `User with id: ${id} deleted`
        }

        res.json(result);

    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, createUser, updateUser, updatePartialUser, deleteUser }