// src/models/Wallet.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  currentMonthDeposit: { type: Number, default: 0 },
  lastWakeupDate: { type: Date },
  streakCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', walletSchema);