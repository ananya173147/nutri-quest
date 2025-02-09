const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  description: String,
  points: Number,
  deadline: String,
  completed: Boolean,
  type: String,
});

module.exports = mongoose.model("Challenge", ChallengeSchema, "Challenges");