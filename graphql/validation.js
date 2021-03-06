const validator = require('validator');

exports.checkSignup = userInput => {
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
        errors.push({ message: 'Email is invalid' });
    }
    if (
        validator.isEmpty(userInput.password)
        || !validator.isLength(userInput.password, { min: 8 })
    ) {
        errors.push({ message: 'Password too short' });
    }
    if (validator.isEmpty(userInput.name)) {
        errors.push({ message: 'No name entered' });
    }
    if (errors.length > 0) {
        const error = new Error('Invalid input');
        error.data = errors;
        error.code = 422;
        throw error;
    }
};

exports.checkPost = postInput => {
    const errors = [];
    if (
        validator.isEmpty(postInput.title)
        || !validator.isLength(postInput.title, { min: 5 })
    ) {
        errors.push({ message: 'Title is invalid' });
    }
    if (
        validator.isEmpty(postInput.content)
        || !validator.isLength(postInput.content, { min: 5 })
    ) {
        errors.push({ message: 'Content is invalid' });
    }
    if (errors.length > 0) {
        const error = new Error('Invalid input');
        error.data = errors;
        error.code = 422;
        throw error;
    }
};
