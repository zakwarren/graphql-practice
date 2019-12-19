const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const credentials = require('../credentials');
const validation = require('./validation');

const User = require('../models/user');

module.exports = {
    createUser: async function({ userInput }, req) {

        validation.checkSignup(userInput);

        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
            const error = new Error('User already exists');
            throw error;
        }

        const hashedPw = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw
        });
        const createdUser = await user.save();

        return {
            ...createdUser._doc,
            _id: createdUser._id.toString()
        };
    },
    login: async function({ email, password}) {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('Authentication failed');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Authentication failed');
            error.code = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            credentials.PRIVATE_KEY,
            { expiresIn: '1h' }
        );
        return {
            token: token,
            userId: user._id.toString()
        };
    }
};