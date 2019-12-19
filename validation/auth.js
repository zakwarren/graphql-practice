const { body } = require('express-validator');

const User = require('../models/user');

exports.checkSignup = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
        .custom((value, { req }) => {
            return User
                .findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email address already exists');
                    }
                })
        }),
    body('password')
        .trim()
        .isLength({ min: 8 }),
    body('name')
        .trim()
        .not()
        .isEmpty()
];

exports.checkStatus = [
    body('status')
        .trim()
        .not()
        .isEmpty()
];
