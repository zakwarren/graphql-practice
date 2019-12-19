const express = require('express');

const feedController = require('../controllers/feed');
const feedValidator = require('../validation/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/posts', isAuth, feedController.getPosts);
router.post('/post', isAuth, feedValidator.checkPost, feedController.createPost);
router.get('/post/:postId', isAuth, feedController.getPost);
router.put('/post/:postId', isAuth, feedValidator.checkPost, feedController.updatePost);
router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;