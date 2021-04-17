const {Router} = require('express');

const { 
    postRequestValidations,
    putRequestValidations,
    deleteRequestValidations,
    getRequestValidations,
    getAllRequestValidations
} = require('../middlewares/users/index');

const {
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    getUserById
} = require('../controllers/users');

const router = Router();

router.get('/', getAllRequestValidations, getAllUsers)

router.get('/:id', getRequestValidations, getUserById)

router.post('/', postRequestValidations, createUser)

router.put('/:id', putRequestValidations, updateUser)

router.delete('/:id', deleteRequestValidations, deleteUser)

module.exports = router;