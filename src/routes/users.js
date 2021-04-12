const {Router} = require('express');

const { 
    postRequestValidations,
    putRequestValidations,
    requestValidations
} = require('../middlewares/users/index');

const {
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    getUserById
} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers)

router.get('/:id', requestValidations, getUserById)

router.post('/', postRequestValidations, createUser)

router.put('/:id', putRequestValidations, updateUser)

router.delete('/:id', requestValidations, deleteUser)

module.exports = router;