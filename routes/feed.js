const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const feedValidator = require('../validation/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.post('/post', feedValidator.checkPost, feedController.createPost);
router.get('/post/:postId', feedController.getPost);

module.exports = router;