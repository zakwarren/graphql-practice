const express = require('express');

const router = express.Router();

const authValidator = require('../validation/auth');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

router.put('/signup', authValidator.checkSignup, authController.signup);
router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);
router.patch('/status', isAuth, authValidator.checkStatus, authController.updateUserStatus);

module.exports = router;