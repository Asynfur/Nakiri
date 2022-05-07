const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema({
  channel: { type: String }


});

module.exports = mongoose.model('Logs', LogsSchema);