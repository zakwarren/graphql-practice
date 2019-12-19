const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user');

module.exports = {
    createUser: async function({ userInput }, req) {
        const email = userInput.email;
        const name = userInput.name;
        const password = userInput.password;

        const errors = [];
        if (!validator.isEmail(email)) {
            errors.push({ message: 'Email is invalid' });
        }
        if (
            validator.isEmpty(password)
            || !validator.isLength(password, { min: 8 })
        ) {
            errors.push({ message: 'Password too short' });
        }
        if (validator.isEmpty(name)) {
            errors.push({ message: 'No name entered' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid input');
            throw error;
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            const error = new Error('User already exists');
            throw error;
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hashedPw
        });
        const createdUser = await user.save();

        return {
            ...createdUser._doc,
            _id: createdUser._id.toString()
        };
    }
};