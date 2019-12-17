const express = require('express');

const feedController = require('../controllers/feed');
const feedValidator = require('../validation/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.post('/post', feedValidator.checkPost, feedController.createPost);
router.get('/post/:postId', feedController.getPost);
router.put('/post/:postId', feedValidator.checkPost, feedController.updatePost);

module.exports = router;