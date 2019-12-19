const express = require('express');

const router = express.Router();

const authValidator = require('../validation/auth');
const authController = require('../controllers/auth');

router.put('/signup', authValidator.checkSignup, authController.signup);
router.post('/login', authController.login);

module.exports = router;