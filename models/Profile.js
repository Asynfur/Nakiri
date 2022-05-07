const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userID: { type: String },
  marry: { type: String, default: 'Single' },
  rep: { type: Number, default: 0}


});

module.exports = mongoose.model('Profile', ProfileSchema);