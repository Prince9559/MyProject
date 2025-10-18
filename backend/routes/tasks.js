const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const { Task } = require('../models');
const { Op } = require('sequelize');

router.post('/',
  auth,
  body('title').isLength({ min: 1 }).withMessage('Title required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { title, description } = req.body;
      const task = await Task.create({ userId: req.userId, title, description });
      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/', auth, async (req, res) => {
  const { q, completed } = req.query;
  const where = { userId: req.userId };
  if (q) where.title = { [Op.like]: `%${q}%` };
  if (completed !== undefined) where.completed = completed === 'true';
  try {
    const tasks = await Task.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    await task.save();
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    return res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
