const bcrypt = require('bcryptjs');

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
    }
};