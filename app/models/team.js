const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    describtion: {
      type: String,
    },
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const teamModel = mongoose.model("team", teamSchema);
module.exports = { teamModel };
