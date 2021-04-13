const {Router} = require('express');
const router = Router();

const { 
    postLoginRequestValidations
} = require('../middlewares/auth/index');

const {
    login
} = require('../controllers/auth');


router.post('/login', postLoginRequestValidations, login);

module.exports = router;