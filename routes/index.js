var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/blogposts', db.getAllPosts);
router.get('/api/blogposts/:id', db.getSinglePost);
router.post('/api/blogposts', db.createPost);
router.put('/api/blogposts/:id', db.updatePost);
router.delete('/api/blogposts/:id', db.removePost);

module.exports = router;