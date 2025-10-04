// routes/profile.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');

// GET /api/profile  (protected)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile  (protected)
router.put('/',
  auth,
  body('name').optional().isLength({ min: 2 }),
  body('email').optional().isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findByPk(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { name, email } = req.body;
      if (name) user.name = name;
      if (email) user.email = email;
      await user.save();
      return res.json({ message: 'Profile updated', user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
