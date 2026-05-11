const express = require('express');
const Alarm = require('../models/Alarm');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Middleware to protect routes
router.use(authMiddleware);

// Get all alarms for logged-in user
router.get('/', async (req, res) => {
  try {
    const alarms = await Alarm.find({ userId: req.userId }).sort({ time: 1 });
    res.json(alarms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new alarm
router.post('/', async (req, res) => {
  try {
    const { time, days, challengeDifficulty } = req.body;
    
    const alarm = await Alarm.create({
      userId: req.userId,
      time,
      days: days || [],
      challengeDifficulty: challengeDifficulty || 'easy'
    });
    
    res.status(201).json(alarm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an alarm
router.put('/:id', async (req, res) => {
  try {
    const alarm = await Alarm.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    
    if (!alarm) {
      return res.status(404).json({ error: 'Alarm not found' });
    }
    
    res.json(alarm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an alarm
router.delete('/:id', async (req, res) => {
  try {
    const alarm = await Alarm.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!alarm) {
      return res.status(404).json({ error: 'Alarm not found' });
    }
    
    res.json({ message: 'Alarm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;