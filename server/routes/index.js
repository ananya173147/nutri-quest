const express = require('express');
const router = express.Router();

// Root path response
router.get("/", (req, res) => {
  res.status(200).send("Welcome to NutriQuest API!");
});

router.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// Community routes
router.get("/api/community/posts", (req, res) => {
  res.json({
    posts: [
      {
        _id: '1',
        username: 'GreenChef',
        avatar: '👩‍🍳',
        content: 'Made an amazing zero-waste meal with leftover vegetables!',
        likes: 24,
        comments: 5,
        createdAt: '2024-03-28T10:00:00Z',
        type: 'recipe',
        images: ['/mock/recipe1.jpg']
      }
    ]
  });
});

module.exports = router;