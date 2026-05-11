const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: String, required: true }, // Format: "HH:MM" in 24-hour
  days: [{ type: Number, min: 0, max: 6 }], // 0=Sunday, 1=Monday... 6=Saturday
  isActive: { type: Boolean, default: true },
  challengeType: { type: String, default: 'math', enum: ['math'] },
  challengeDifficulty: { type: String, default: 'easy', enum: ['easy', 'medium', 'hard'] },
  sound: { type: String, default: 'default' },
  snoozeEnabled: { type: Boolean, default: false },
  snoozeCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alarm', alarmSchema);