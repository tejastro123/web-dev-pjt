const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

// Toggle Bookmark
router.put('/bookmark/:restaurantId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const restaurantId = req.params.restaurantId;

    if (user.bookmarks.includes(restaurantId)) {
      user.bookmarks = user.bookmarks.filter(id => id.toString() !== restaurantId.toString());
      await user.save();
      return res.json({ msg: 'Bookmark removed', bookmarks: user.bookmarks });
    } else {
      user.bookmarks.push(restaurantId);
      await user.save();
      return res.json({ msg: 'Bookmarked', bookmarks: user.bookmarks });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Toggle Follow User
router.put('/follow/:userId', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.userId);

    if (!targetUser) return res.status(404).json({ msg: 'User not found' });

    if (currentUser.following.includes(req.params.userId)) {
      // Unfollow
      currentUser.following = currentUser.following.filter(id => id.toString() !== req.params.userId.toString());
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== req.user.id.toString());
    } else {
      // Follow
      currentUser.following.push(req.params.userId);
      targetUser.followers.push(req.user.id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({ following: currentUser.following });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
