const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: ''  },
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {timestamps: true});

module.exports = mongoose.model('Note', userSchema);